# bd2-ngx-polarplot

Angular component for plotting data in cyclic coordinates (mod range).

![example](https://cloud.githubusercontent.com/assets/13380238/25580619/4f443636-2e7a-11e7-9c50-c694b5df9a61.jpg)

Interactive [demo](https://tzielins.github.io/bd2-ngx-polarplot/)

Although it is called polar plot, it is not the de-facto polar plot in the sense in the matlab,
as the data are one dimensional rather then angle/radius in typical polar plot.

It was designed to plot circadian phases, so peak times in data in 24 scale.

The domain range is cyclic, so the data are mod range, ie data 3, 27, 28 will be plotted
as 3, 3, 4.

The petals represents the mean value of the series. Petals radius and width can be scaled by std dev of the data or the provided error values.

## How to use it

### Installation

`npm install bd2-ngx-polarplot --save`

### Using

1. Import the PolarPlotModule module:

```
@NgModule({
...
  imports: [
  ...
    BD2NgxPolarplotModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Place the component in your template:

```
<bd2-ngx-polar-plot
  [data]="data" [domain]="domain" [showIndividuals]="all"
  [scaleRadius]="true" >
</bd2-ngx-polar-plot>
```

3. Inputs

- `data: number[][]` series of data to represents as petals.
  For example:
```
data = [
[-23.4,1,25.2,48.7,73.1],
[22.5,21.5,20.6],
[3.5,4.9,3,4.9],
[15.1,16.2,16.1,12.2,12.8]
]
```
gives 4 petals as in the screenshot

- `domain: [start, end]` data will be represented around the circle `[start,end)` mod domain range.
  Start does not have to be 0. The example above is made with domain `[0,24]`

- `showIndividuals: node | selected | all`, defaults `selected`. Determines how individual data points are presented,
  none no rendering, all, all data points are represented as cricles in the corresponding locations, selected the individual
  data points are rendered only when the corresponding petal is hoovered over. The example above is taken with option `all`

- `scaleRadius: boolean`, default true, petals radius/length is scalled by the std deviationo of the data or provided errors. The larger the deviation/error the shorted the petal

- `scaleWidth: boolean`, default false, petals width can be scalled by the std deviation of the data or provided errors values. The larger the error the wider the petal

- optional `errors: number[]`, optional, errors values for each series, if missing the std. deviation of the inuput series is used for scaling width or radius

- optional `palette: string[]`, optional, collors to be used with the data

- optional `labels: string[]`, labels of the data, will be rendered in the center on hover over the petal

- optional `labelsOn: boolean`, if true the label on hover works otherwise disabled

- optional `lookAndFeel`, some rendering parameters, check the code for options

- optional `removed: number[]`, indexes of the data groups that should be removed from plot. The removed groups are being rendered just hidden so the labels, colors are preserved and bringing them back/removing does not triggers transitions in the not removed petals

## The angular demo project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Credits

Integration with D3 is based on the code from [d3-ng2-service](https://github.com/tomwanzek/d3-ng2-service)
by Tom Wanzek.
The d3-ng2-service was actually used during development but then removed to reduce the dependencies and bundle size.

The axis grid is based on the radar plot implementation by Nadieh Bremer: [radar chart](https://gist.github.com/nbremer/21746a9668ffdf6d8242), [radar chart redesigned](https://www.visualcinnamon.com/2015/10/different-look-d3-radar-chart.html)

The examples from Tom Wanzek [https://tomwanzek.github.io/d3-ng2-demo/] were also of great help.

Performance optimization was achieved by using tricks described by Pascal Precht in articles about using:
[ngZone](https://blog.thoughtram.io/angular/2017/02/21/using-zones-in-angular-for-better-performance.html) [ChangeDetectionStrategy](https://blog.thoughtram.io/angular/2017/02/02/making-your-angular-app-fast.html).
