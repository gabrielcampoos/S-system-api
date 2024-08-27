import { Base } from "./Base";

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
    private _pageLines: string
  ) {
    super(_id);
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
    };
  }

  editHole(data: EditHoleDto): boolean {
    if (data.holeNumber) {
      if (data.holeNumber?.length < 0) {
        return false;
      }

      this._holeNumber = data.holeNumber;
    }

    if (data.initialDate) {
      if (data.initialDate === null) {
        return false;
      }

      this._initialDate = data.initialDate;
    }

    if (data.finalDate) {
      if (data.finalDate === null) {
        return false;
      }

      this._finalDate = data.finalDate;
    }

    if (data.workDescription) {
      if (data.workDescription?.length < 0) {
        return false;
      }

      this._workDescription = data.workDescription;
    }

    if (data.name) {
      if (data.name?.length < 0) {
        return false;
      }

      this._name = data.name;
    }

    if (data.workDescription) {
      if (data.workDescription === null) {
        return false;
      }

      this._workDescription = data.workDescription;
    }

    if (data.quota) {
      if (data.quota?.length < 0) {
        return false;
      }

      this._quota = data.quota;
    }

    if (data.waterLevel) {
      if (data.waterLevel?.length < 0) {
        return false;
      }

      this._waterLevel = data.waterLevel;
    }

    if (data.interval) {
      if (data.interval?.length < 0) {
        return false;
      }

      this._interval = data.interval;
    }

    if (data.waterLevelTwo) {
      if (data.waterLevelTwo?.length < 0) {
        return false;
      }

      this._waterLevelTwo = data.waterLevelTwo;
    }

    if (data.torque) {
      if (data.torque?.length < 0) {
        return false;
      }

      this._torque = data.torque;
    }

    if (data.coating) {
      if (data.coating?.length < 0) {
        return false;
      }

      this._coating = data.coating;
    }

    if (data.ultimateDigger) {
      if (data.ultimateDigger?.length < 0) {
        return false;
      }

      this._ultimateDigger = data.ultimateDigger;
    }

    if (data.initialHelical) {
      if (data.initialHelical?.length < 0) {
        return false;
      }

      this._initialHelical = data.initialHelical;
    }

    if (data.finalHelical) {
      if (data.finalHelical?.length < 0) {
        return false;
      }

      this._finalHelical = data.finalHelical;
    }

    if (data.printSpt) {
      if (data.printSpt?.length < 0) {
        return false;
      }

      this._printSpt = data.printSpt;
    }

    if (data.stop) {
      if (data.stop?.length < 0) {
        return false;
      }

      this._stop = data.stop;
    }

    if (data.textPoll) {
      if (data.textPoll?.length < 0) {
        return false;
      }

      this._textPoll = data.textPoll;
    }

    if (data.prober) {
      if (data.prober?.length < 0) {
        return false;
      }

      this._prober = data.prober;
    }

    if (data.pageLines) {
      if (data.pageLines?.length < 0) {
        return false;
      }

      this._pageLines = data.pageLines;
    }

    return true;
  }
}
