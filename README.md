#  Subsidies City of Amsterdam  #


Subsite with d3.js graphs and DataTables representation of subsidies given by the City of Amsterdam.

To see the site live:
http://subsidie-feiten.amsterdam.nl

The data is obtained through a CSV via a persistant link from [our data portal](https://data.amsterdam.nl/#?dte=dcatd%2Fdatasets%2Fopenbaar-subsidieregister-amsterdam&dtfs=T&mpb=topografie&mpz=11&mpv=52.3731081:4.8932945):


### Install procedure ###

1. Using Python 3.# to develop locally

```
git clone https://github.com/Amsterdam/subsidies.git subsidies
cd subsidies
python -m http.server 8000
```
The site can be found on http://localhost:8000</br>

2. Using Docker

Download and install <a href="https://www.docker.com">docker</a></br>

```
git clone https://github.com/Amsterdam/subsidies.git subsidies
cd subsidies
docker-compose build
docker-compose up -d
```
The site can be found on http://localhost:8001</br>
