# Overview

This repo contains a script that parses `F1401803.XML`-response about personal income from UA Tax Office. The script prints the parsed data in the form of CSV.

The result CSV is convenient for calculating sums by income symbols in MS Excel

## How to use

1. Request accrued income records [online](https://cabinet.tax.gov.ua/individual/f01002)
1. Put the response in the same folder of index.js file
1. Rename response to `F1401803.XML`
1. Run `node index.js > F1401803.csv` to get CSV - file

