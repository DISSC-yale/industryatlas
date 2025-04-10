"""Import and reformat data from the original source."""

from json import dumps
from os import makedirs
from os.path import isfile
from urllib.request import urlretrieve
from zipfile import ZipFile

import geopandas
import pandas

if __name__ == "__main__":
    basedir = "../original/data/"
    outdir = "public/data/"
    makedirs(basedir, exist_ok=True)
    makedirs(outdir + "by_year", exist_ok=True)
    makedirs(outdir + "by_sector", exist_ok=True)

    # data
    zipfile = f"{basedir}/efsy_panel_naics.csv.zip"
    if not isfile(zipfile):
        urlretrieve(
            "http://fpeckert.me/cbp/Imputed%20Files/efsy_panel_naics.csv.zip", zipfile
        )
    with ZipFile(zipfile, "r") as archive:
        filename = [p.filename for p in archive.filelist if "efsy" in p.filename][0]
        with archive.open(filename) as file:
            data = pandas.read_csv(
                file,
                dtype={
                    "fipstate": str,
                    "fipscty": str,
                    "naics12": str,
                    "emp": float,
                    "year": str,
                    "v1": float,
                },
            )
    data["county"] = data["fipstate"].astype(str).str.pad(2, fillchar="0") + data[
        "fipscty"
    ].astype(str).str.pad(3, fillchar="0")
    data["sector"] = (
        data["naics12"]
        .str[:2]
        .replace(
            {"32": "31", "33": "31", "45": "44", "49": "48", "95": "92", "99": "92"}
        )
    )
    totals = data.groupby(["year", "county"])["emp"].sum().reset_index()
    totals["sector"] = "10"
    aggregated = pandas.concat(
        [totals, data.groupby(["year", "county", "sector"])["emp"].sum().reset_index()]
    ).pivot(index=["year", "sector"], columns="county", values="emp")

    ## save by year files
    for year, data in aggregated.reset_index().set_index("sector").groupby("year"):
        with open(f"{outdir}by_year/{year}.json", "w", encoding="utf-8") as file:
            file.write(
                dumps(
                    {
                        "sector": data.index.to_list(),
                        **{
                            sector: data[sector]
                            .round()
                            .fillna(-1)
                            .astype(int)
                            .to_list()
                            for sector in data.columns
                            if sector != "year"
                        },
                    },
                    separators=(",", ":"),
                ).replace("-1", "null")
            )

    ## save by sector files
    for sector, data in aggregated.reset_index().set_index("year").groupby("sector"):
        with open(f"{outdir}by_sector/{sector}.json", "w", encoding="utf-8") as file:
            file.write(
                dumps(
                    {
                        "year": data.index.to_list(),
                        **{
                            county: data[county]
                            .round()
                            .fillna(-1)
                            .astype(int)
                            .to_list()
                            for county in data.columns
                            if county != "sector"
                        },
                    },
                    separators=(",", ":"),
                ).replace("-1", "null")
            )

    # map
    mapfile = "public/counties_2010.geojson"
    if not isfile(mapfile):
        counties = geopandas.read_file(
            "https://raw.githubusercontent.com/uva-bi-sdad/sdc.geographies/refs/heads/main/"
            "US/Census%20Geographies/County/2010/data/distribution/"
            "us_geo_census_cb_2010_counties.geojson",
            columns=["geoid", "region_name", "geometry"],
        )
        counties["geometry"] = counties["geometry"].simplify(0.01)

        # clean up Alaska
        polys = counties[counties["geoid"] == "02016"]["geometry"].polygonize()
        counties.loc[counties["geoid"] == "02016", "geometry"] = geopandas.GeoSeries(
            polys[[p.bounds[0] < 0 for p in polys]]
        ).union_all()

        # arrange discontinuous states
        alaska_su = counties["region_name"].str.contains("Alaska")
        counties.loc[alaska_su, "geometry"] = counties.loc[
            alaska_su, "geometry"
        ].translate(55, -2)

        hawaii_su = counties["region_name"].str.contains("Hawaii")
        counties.loc[hawaii_su, "geometry"] = counties.loc[
            hawaii_su, "geometry"
        ].translate(37, 8)

        puerto_rico_su = counties["region_name"].str.contains("Puerto Rico")
        counties.loc[puerto_rico_su, "geometry"] = counties.loc[
            puerto_rico_su, "geometry"
        ].translate(-5, 15)

        counties.to_file(mapfile)
