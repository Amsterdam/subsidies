# Subsidies City of Amsterdam

- PROD: [https://subsidie-feiten.amsterdam.nl](https://subsidie-feiten.amsterdam.nl)
- ACC: [https://acc.subsidie-feiten.amsterdam.nl](https://acc.subsidie-feiten.amsterdam.nl)

Subsite which shows the subsidies given by the City of Amsterdam. Data is presented in graphs and tables.

To see the site live:
http://subsidie-feiten.amsterdam.nl

The data is obtained through a CSV via a persistant link from [our data portal](https://data.amsterdam.nl/datasets/yvlbMxqPKn1ULw):

# Install procedure

Download and install <a href="https://www.docker.com">docker</a></br>

```
git clone https://github.com/Amsterdam/subsidies.git subsidies
cd subsidies
docker-compose build
docker-compose up -d
```

The site can be found on http://localhost:8001

# Developing

This site is build using Create React App version 5 and uses Node version 16.

To get a local development environment working use the following steps.

    # install dependencies
    npm install

    # start with hot reload at localhost:3000
    npm run start

    # build for production with minification
    npm run build
