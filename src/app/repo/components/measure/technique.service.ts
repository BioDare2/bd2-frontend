import {Injectable} from '@angular/core';
import {Parameter} from '../../../dom/repo/param/parameters';

@Injectable({
  providedIn: 'root'
})
export class TechniqueService {

  techniques: string[];
  equipments: Map<string, string[]> = new Map<string, string[]>();
  parameters: Map<string, Parameter[]> = new Map<string, Parameter[]>();

  constructor() {
    this.initTechniques();
  }

  getTechniques(): Promise<string[]> {
    return Promise.resolve(this.techniques);
  }

  getEquipments(technique: string): Promise<string[]> {
    if (this.equipments.has(technique)) {
      return Promise.resolve(this.equipments.get(technique));
    }

    return Promise.reject<string[]>(new Error('Unknown technique: ' + technique));
  }

  getParameters(technique: string): Promise<Parameter[]> {
    if (this.parameters.has(technique)) {
      return Promise.resolve(this.parameters.get(technique));
    }

    return Promise.reject<Parameter[]>(new Error('Unknown technique: ' + technique));
  }

  registerEquipment(technique: string, equipment: string): Promise<string> {
    if (!this.equipments.has(technique)) {
      return Promise.reject<string>(new Error('Unknown technique: ' + technique));
    }

    if (this.equipments.get(technique).indexOf(equipment) < 0) {
      this.equipments.get(technique).push(equipment);
    }
    return Promise.resolve(equipment);
  }

  private initTechniques() {

    const imgTech = [
      'Luciferase luminescence',
      'Bioluminescence',
      '(G)FP fluorescence',
      'Delayed fluorescence',
      'Endogenous fluorescence',
      'Leaf movement',
      'General imaging',
    ];

    this.techniques = imgTech
      .concat([
        'Computer simulation',
        'qRT-PCR',
        'RNA microarray',
        'RNA-Seq',
        'Northern blot',
        'Western blot',
        'Protein array',
        'Mass Spectrometry',
        'Flow cytometry',
        'Spectrophotometry',
        'Immunoprecipitation',
        'Biomass Assay',
        'Gas exchange',
        'Oxygen concentration',
        'Other'
      ]);

    const imagingEq = [
      '',
      'Luminometer',
      'Tecan Infinite 200 PRO',
      'Topcount 1',
      'Topcount 2',
      'Topcount 3',
      'Topcount 4',
      'HAM 1',
      'HAM 2',
      'HAM 3',
      'Unknown'
    ];

    this.equipments = new Map<string, string[]>();

    this.techniques.forEach(v => this.equipments.set(v, ['', 'Unknown']));
    imgTech.forEach(v => this.equipments.set(v, imagingEq));
    this.equipments.set('qRT-PCR', ['', 'Robot + Light Cycler 480', 'Light Cycler 480', 'Unknown']);
    this.equipments.set('Oxygen concentration', ['', 'Galvanic Clarck\'s probe', 'Unknown']);

    const imgParams: Parameter[] = [];
    imgParams.push(new Parameter('exposure_time', undefined, 'Exposure time', 'min'));
    imgParams.push(new Parameter('interval', undefined, 'Img interval', 'h'));
    imgParams.push(new Parameter('start_time', undefined, 'Start time', 'h'));

    this.parameters = new Map<string, Parameter[]>();
    this.techniques.forEach(v => this.parameters.set(v, []));
    imgTech.forEach(v => this.parameters.set(v, imgParams));


  }

}
