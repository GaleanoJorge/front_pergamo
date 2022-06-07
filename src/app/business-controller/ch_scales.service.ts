import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChScales } from '../models/ch-scales';


@Injectable({
  providedIn: 'root'
})
export class ChScalesService {
  public ch_scales: ChScales[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChScales[]> {
    let servObj = new ServiceObject(params ? 'chScaleNorton?pagination=false' : 'ch_scales');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_scales = <ChScales[]>servObj.data.ch_scales;

        return Promise.resolve(this.ch_scales);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveNorton(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('chScaleNorton');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveGlasgow(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('chScaleGlasgow');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveBarthel(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('chScaleBarthel');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  
  SavePayette(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('chScalePayette');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  SaveFragility(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_fragility');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveNews(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_news');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SavePap(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_pap');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveHamilton(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_hamilton');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveCam(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_cam');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveFac(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_fac');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveRedCross(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_red_cross');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveKarnofsky(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_karnofsky');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveEcog(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_ecog');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  
  SavePNutrition(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_pediatric_nutrition');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveEsas(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_esas');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  
  SaveFlacc(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_flacc');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  
  SavePpi(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_ppi');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

    
  SaveZarit(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_zarit');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SavePain(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_pain');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveWongBaker(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_wong_baker');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  
  SavePfeiffer(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_pfeiffer');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveJhDownton(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_jh_downton');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveScreening(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_screening');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SavePps(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_pps');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveBraden(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_braden');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  SaveLawton(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scale_lawton');
    servObj.data = ch_scales;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Update(ch_scales: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scales', ch_scales.id);
    servObj.data = ch_scales;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_scales', id);
    return this.webAPI.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
