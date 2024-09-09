import { Base } from "./Base";
import { Layer, LayerJson } from "./Layer";

export interface HoleJson {
  id: string;
  holeNumber: string;
  initialDate: Date;
  finalDate: Date;
  name: string;
  workDescription: string;
  quota: string;
  waterLevel: string;
  interval: string;
  waterLevelTwo: string;
  intervalTwo: string;
  torque: string;
  coating: string;
  ultimateDigger: string;
  initialHelical: string;
  finalHelical: string;
  printSpt: string;
  stop: string;
  textPoll: string;
  prober: string;
  pageLines: string;
  layers: LayerJson[];
}

interface EditHoleDto {
  holeNumber?: string;
  initialDate?: Date;
  finalDate?: Date;
  name?: string;
  workDescription?: string;
  quota?: string;
  waterLevel?: string;
  interval?: string;
  waterLevelTwo?: string;
  intervalTwo?: string;
  torque?: string;
  coating?: string;
  ultimateDigger?: string;
  initialHelical?: string;
  finalHelical?: string;
  printSpt?: string;
  stop?: string;
  textPoll?: string;
  prober?: string;
  pageLines?: string;
}

export class Hole extends Base {
  private _layers: Layer[] = [];

  constructor(
    _id: string,
    private _holeNumber: string,
    private _initialDate: Date = Hole.getCurrentDate(),
    private _finalDate: Date = Hole.getCurrentDate(),
    private _name: string,
    private _workDescription: string,
    private _quota: string,
    private _waterLevel: string,
    private _interval: string,
    private _waterLevelTwo: string,
    private _intervalTwo: string,
    private _torque: string,
    private _coating: string,
    private _ultimateDigger: string,
    private _initialHelical: string,
    private _finalHelical: string,
    private _printSpt: string,
    private _stop: string,
    private _textPoll: string,
    private _prober: string,
    private _pageLines: string,
    layers: Layer[] = [] // Adicionando a opção de inicializar com uma lista de camadas
  ) {
    super(_id);
    this._layers = layers; // Inicializando a lista de camadas
  }

  private static getCurrentDate(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public toJson(): HoleJson {
    return {
      id: this._id,
      holeNumber: this._holeNumber,
      initialDate: this._initialDate,
      finalDate: this._finalDate,
      name: this._name,
      workDescription: this._workDescription,
      quota: this._quota,
      waterLevel: this._waterLevel,
      interval: this._interval,
      waterLevelTwo: this._waterLevelTwo,
      intervalTwo: this._intervalTwo,
      torque: this._torque,
      coating: this._coating,
      ultimateDigger: this._ultimateDigger,
      initialHelical: this._initialHelical,
      finalHelical: this._finalHelical,
      printSpt: this._printSpt,
      stop: this._stop,
      textPoll: this._textPoll,
      prober: this._prober,
      pageLines: this._pageLines,
      layers: this._layers.map((layer) => layer.toJson()), // Certifique-se de que Layer tem um método toJson
    };
  }

  public editHole(data: EditHoleDto): boolean {
    const {
      holeNumber,
      initialDate,
      finalDate,
      name,
      workDescription,
      quota,
      waterLevel,
      interval,
      waterLevelTwo,
      intervalTwo,
      torque,
      coating,
      ultimateDigger,
      initialHelical,
      finalHelical,
      printSpt,
      stop,
      textPoll,
      prober,
      pageLines,
    } = data;

    if (holeNumber !== undefined) {
      this._holeNumber = holeNumber;
    }
    if (initialDate !== undefined) {
      this._initialDate = initialDate;
    }
    if (finalDate !== undefined) {
      this._finalDate = finalDate;
    }
    if (name !== undefined) {
      this._name = name;
    }
    if (workDescription !== undefined) {
      this._workDescription = workDescription;
    }
    if (quota !== undefined) {
      this._quota = quota;
    }
    if (waterLevel !== undefined) {
      this._waterLevel = waterLevel;
    }
    if (interval !== undefined) {
      this._interval = interval;
    }
    if (waterLevelTwo !== undefined) {
      this._waterLevelTwo = waterLevelTwo;
    }
    if (intervalTwo !== undefined) {
      this._intervalTwo = intervalTwo;
    }
    if (torque !== undefined) {
      this._torque = torque;
    }
    if (coating !== undefined) {
      this._coating = coating;
    }
    if (ultimateDigger !== undefined) {
      this._ultimateDigger = ultimateDigger;
    }
    if (initialHelical !== undefined) {
      this._initialHelical = initialHelical;
    }
    if (finalHelical !== undefined) {
      this._finalHelical = finalHelical;
    }
    if (printSpt !== undefined) {
      this._printSpt = printSpt;
    }
    if (stop !== undefined) {
      this._stop = stop;
    }
    if (textPoll !== undefined) {
      this._textPoll = textPoll;
    }
    if (prober !== undefined) {
      this._prober = prober;
    }
    if (pageLines !== undefined) {
      this._pageLines = pageLines;
    }

    return true;
  }

  public getId(): string {
    return this._id;
  }

  // Adicionando métodos para manipular a lista de camadas
  public addLayer(layer: Layer): void {
    this._layers.push(layer);
  }

  public removeLayer(layerId: string): void {
    this._layers = this._layers.filter((layer) => layer.getId() !== layerId);
  }

  public getLayers(): Layer[] {
    return this._layers;
  }
}
