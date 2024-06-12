# Bd2NgxHeatmap

Bd2NgxHeatmap

An angular component used by BioDare2 to display data on HeatMap chart.

The component uses only svg elements and angular directives
*ngIf, *ngFor, [attr.x] to render and manage the plots.
The d3 libraries like d3-scales are used only for computations
of coordinates or colors not for rendering.


## How to use it

### Installation

`npm install bd2-ngx-heatmap --save`

### Using

1. Import the Bd2NgxHeatmapModule module

```
@NgModule({
...
  imports: [
    ...
    Bd2NgxHeatmapModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Include heatmap component in your template:

```
      <bd2-num-heatmap [data]="data" class="customized">
      </bd2-num-heatmap>
```

3. Inputs:

4. Styling can be customized overriding component css.

For example:

```
::ng-deep bd2-num-heatmap.customized .bd2hm-axisWrapper line {
  stroke: red;
}
```

Check the demo app, and Bd2NumHeatmapComponent embeded css for
classes.


## Demo

Interactive [demo](https://tzielins.github.io/bd2-ngx-heatmap/)

