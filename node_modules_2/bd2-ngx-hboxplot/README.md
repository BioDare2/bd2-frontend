# Bd2NgxHboxplot

Bd2NgxHboxplot

Horizontal Box Plot (Whisker Plot) generated using D3 library. The items are stacked vertically
so that the plot can grow downwards for the large data sets.

The box/whisker properties (median, quartile) are calculated automatically based on the provided data.

Interactive [demo](https://tzielins.github.io/bd2-ngx-hboxplot/index.html)

## How to use it

### Installation

`npm install bd2-ngx-hboxplot --save`

### Using

1. Import the HBoxModule module:

```
@NgModule({
...
  imports: [
  ...
    BD2NgxHBoxplotModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Place the component in your template:

```
<bd2-ngx-hbox-plot
  [data]="data" [labels]="labels" [sorted]="sorted">
</bd2-ngx-polar-plot>
```

3. Inputs

- `data: number[][]` series of data to represents box plots.
  For example:
```
data = [
 [20, 21, 23, 24, 25],
 [18, 18.5, 25.5, 25, 26, 22.8, 25.8, 26, 25.1, 26.8],
 [30],
 [20, 20.5, 20.6],
 [28, 29.7, 28.5],
 [21.5, 29.7, 28.4, 29.5, 24, 24.1, 25.9, 24.7, 23.7, 24.3, 23.4, 24.5, 22.5, 23.7, 23.9, 23.5],
 []
];
```

- `domain: [start, end]` values range to be used on x axis.

- optional `palette: string[]`, optional, collors to be used with the data

- optional `labels: string[]`, labels of the data, will be rendered on the left y axis

- optional `labelsOn: 'always' | 'trigger' | 'null'`, if trigger labels text are rendered when hoovered over the label's bar

- optional `lookAndFeel`, some rendering parameters, check the code for options

- optional `removed: number[]`, indexes of the data groups that should be removed from plot. The removed groups are being rendered just hidden so the labels, colors are preserved and bringing them back/removing does not triggers transitions in the not removed petals

## The angular demo project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

