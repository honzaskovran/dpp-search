# dpp-search
Node app to find connections in Prague Public Transport. APP transoforms search results from [spojeni.dpp.cz](http://spojeni.dpp.cz) into simple JSON format. See [demo](http://dpp-search.obiwan.cloud/).

## Getting started

Clone Project:

```
git clone git@github.com:honzaskovran/dpp-search.git
```

Install dependencies:

```
yarn install
```

Run project:

```
yarn start
```

## Configuration

You can set port using `.env` file like `PORT=3001`

## Usage

### Find connection
```GET localhost:3000/find-connection```

**Parameters:**

|Name|Value|Default|Description|
|----|-----|-------|-----------|
|from|string|''|Start station|
|to|string|''|End station|
|across|string|''|Across station|
|isDeparture|boolean (0/1)|1|Is departure (true) or arrival (false)|
|date|string (DD.MM.YYYY)|today|Date of departure/arrival|
|time|string (HH:MM)|now|Time of departure/arrival|

**Result:**

Result JSON contains array of found connections (0-3). Connection contains routes (1-n) between stations.


```
[
  {
    "start": "HH:MM",
    "end": "HH:MM",
    "routes": [
      {
        "type": "Tram/Bus/Metro",
        "line": "line number",
        "start": {
          "station": "Station name",
          "time": "HH:MM"
        },
        "end": {
          "station": "Station name",
          "time": "HH:MM"
        }
        "walkDuration": "duration in minutes"
      },
      ...
    ]
  },
  ...
]
```

## Demo

[Demo](http://dpp-search.obiwan.cloud/) is simple app that uses dpp-search API to search connections. Besides a formatted result, demo also reveals used data and result JSON.
