import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { TlTherapyLanguageService } from '../../../../business-controller/tl-therapy-language.service';
import { OstomiesTlService } from '../../../../business-controller/ostomies-tl.service';
import { SwallowingDisordersTlService } from '../../../../business-controller/swallowing-disorders-tl.service';
import { VoiceAlterationsTlService } from '../../../../business-controller/voice-alterations-tl.service';
import { HearingTlService } from '../../../../business-controller/hearing-tl.service';
import { LanguageTlService } from '../../../../business-controller/language-tl.service';
import { CommunicationTlService } from '../../../../business-controller/communication-tl.service';
import { CognitiveTlService } from '../../../../business-controller/cognitive-tl.service';
import { SpeechTlService } from '../../../../business-controller/speech-tl.service';
import { SpecificTestsTlService } from '../../../../business-controller/specific-tests-tl.service';
import { TherapeuticGoalsTlService } from '../../../../business-controller/therapeutic-goals-tl.service';
import { CifDiagnosisTlService } from '../../../../business-controller/cif-diagnosis-tl.service';
import { NumberMonthlySessionsTlService } from '../../../../business-controller/number-monthly-sessions-tl.service';
import { OrofacialTlService } from '../../../../business-controller/orofacial-tl.service';

@Component({
  selector: 'ngx-form-language-evolution',
  templateUrl: './form-language-evolution.component.html',
  styleUrls: ['./form-language-evolution.component.scss'],
})
export class FormLanguageEvolutionComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public admissions_id;
  public check1;
  

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private OrofacialTlS: OrofacialTlService,
    private route: ActivatedRoute,
    private OstomiesTlS: OstomiesTlService,
    private SwallowingDisordersTlS: SwallowingDisordersTlService,
    private VoiceAlterationsTlS:VoiceAlterationsTlService,
    private HearingTlS: HearingTlService,
    private LanguageTlS: LanguageTlService,
    private CommunicationTlS: CommunicationTlService,
    private CognitiveTlS: CognitiveTlService,
    private SpeechTlS: SpeechTlService,
    private SpecificTestsTlS: SpecificTestsTlService,
    private TherapeuticGoalsTlS: TherapeuticGoalsTlService,
    private CifDiagnosisTlS: CifDiagnosisTlService,
    private NumberMonthlySessionsTlS: NumberMonthlySessionsTlService,
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    if (!this.data) {
      this.data = { };
    }

    this.form = this.formBuilder.group({
      //Ostomies
      jejunostomy: [this.data.jejunostomy],
      colostomy: [this.data.colostomy],
      observations: [this.data.observations],

      //Alteraciones En La Deglución
      solid_dysphagia: [this.data.solid_dysphagia],
      clear_liquid_dysphagia: [this.data.clear_liquid_dysphagia],
      thick_liquid_dysphagia: [this.data.thick_liquid_dysphagia],
      nasogastric_tube: [this.data.nasogastric_tube],
      gastrostomy: [this.data.gastrostomy],
      nothing_orally: [this.data.nothing_orally],

      //Alteraciones En La Voz
      bell_alteration: [this.data.bell_alteration],
      tone_alteration: [this.data.tone_alteration],
      intensity_alteration: [this.data.intensity_alteration],

      //Audición
      external_ear: [this.data.external_ear],
      middle_ear: [this.data.middle_ear],
      inner_ear: [this.data.inner_ear],

      //Legunaje
      phonetic_phonological: [this.data.phonetic_phonological],
      syntactic: [this.data.syntactic],
      morphosyntactic: [this.data.morphosyntactic],
      semantic: [this.data.semantic],
      pragmatic: [this.data.pragmatic],
      reception: [this.data.reception],
      coding: [this.data.coding],
      decoding: [this.data.decoding],
      production: [this.data.production],

      //Comunicación
      eye_contact: [this.data.eye_contact],
      courtesy_rules: [this.data.courtesy_rules],
      communicative_intention: [this.data.communicative_intention],
      communicative_purpose: [this.data.communicative_purpose],
      oral_verb_modality: [this.data.oral_verb_modality],
      written_verb_modality: [this.data.written_verb_modality],
      nonsymbolic_nonverbal_modality: [
        this.data.nonsymbolic_nonverbal_modality,
      ],
      symbolic_nonverbal_modality: [this.data.symbolic_nonverbal_modality],

      //Cognitivo
      memory: [this.data.memory],
      attention: [this.data.attention],
      concentration: [this.data.concentration],

      //Habla
      breathing: [this.data.breathing],
      joint: [this.data.joint],
      resonance: [this.data.resonance],
      fluency: [this.data.fluency],
      prosody: [this.data.prosody],

      //Orofacial
      right_hermiface_symmetry: [this.data.right_hermiface_symmetry],
      right_hermiface_tone: [this.data.right_hermiface_tone],
      right_hermiface_sensitivity: [this.data.right_hermiface_sensitivity],
      left_hermiface_symmetry: [this.data.left_hermiface_symmetry],
      left_hermiface_tone: [this.data.left_hermiface_tone],
      left_hermiface_sensitivity: [this.data.left_hermiface_sensitivity],
     

      //Pruebas Especificas
      hamilton_scale: [this.data.hamilton_scale],
      boston_test: [this.data.boston_test],
      termal_merril: [this.data.termal_merril],
      prolec_plon: [this.data.prolec_plon],
      ped_guss: [this.data.ped_guss],
      vhi_grbas: [this.data.vhi_grbas],
      pemo_speech: [this.data.pemo_speech],

      //Diagnostico Cif
      text: [this.data.text],

      //Numero de Sesiones Mensuales E Intensidad Semana
      monthly_sessions: [this.data.monthly_sessions],
      weekly_intensity: [this.data.weekly_intensity],
    });
  }

  async save(therapyl) {
    if (therapyl == 1) {
      this.form.controls.jejunostomy.value;
      this.form.controls.colostomy.value;
      this.form.controls.observations.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.OstomiesTlS.Update({
            id: this.data.id,
            jejunostomy: this.form.controls.jejunostomy.value,
            colostomy: this.form.controls.colostomy.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.OstomiesTlS.Save({
            jejunostomy: this.form.controls.jejunostomy.value,
            colostomy: this.form.controls.colostomy.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                jejunostomy: '',
                colostomy: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }

    if (therapyl == 2) {
      this.form.controls.solid_dysphagia.value;
      this.form.controls.clear_liquid_dysphagia.value;
      this.form.controls.thick_liquid_dysphagia.value;
      this.form.controls.nasogastric_tube.value;
      this.form.controls.gastrostomy.value;
      this.form.controls.nothing_orally.value;
      this.form.controls.observations.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.SwallowingDisordersTlS.Update({
            id: this.data.id,
            solid_dysphagia: this.form.controls.solid_dysphagia.value,
            clear_liquid_dysphagia:
              this.form.controls.clear_liquid_dysphagia.value,
            thick_liquid_dysphagia:
              this.form.controls.thick_liquid_dysphagia.value,
            nasogastric_tube: this.form.controls.nasogastric_tube.value,
            gastrostomy: this.form.controls.gastrostomy.value,
            nothing_orally: this.form.controls.nothing_orally.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.SwallowingDisordersTlS.Save({
            solid_dysphagia: this.form.controls.solid_dysphagia.value,
            clear_liquid_dysphagia:
              this.form.controls.clear_liquid_dysphagia.value,
            thick_liquid_dysphagia:
              this.form.controls.thick_liquid_dysphagia.value,
            nasogastric_tube: this.form.controls.nasogastric_tube.value,
            gastrostomy: this.form.controls.gastrostomy.value,
            nothing_orally: this.form.controls.nothing_orally.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                solid_dysphagia: '',
                clear_liquid_dysphagia: '',
                thick_liquid_dysphagia: '',
                nasogastric_tube: '',
                gastrostomy: '',
                nothing_orally: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }

    if (therapyl == 3) {
      this.form.controls.bell_alteration.value;
      this.form.controls.tone_alteration.value;
      this.form.controls.intensity_alteration.value;
      this.form.controls.observations.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.VoiceAlterationsTlS.Update({
            id: this.data.id,
            bell_alteration: this.form.controls.bell_alteration.value,
            tone_alteration:this.form.controls.tone_alteration.value,
            intensity_alteration: this.form.controls.intensity_alteration.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.VoiceAlterationsTlS.Save({
            bell_alteration: this.form.controls.bell_alteration.value,

            tone_alteration: this.form.controls.tone_alteration.value,
            intensity_alteration:this.form.controls.intensity_alteration.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                bell_alteration: '',
                tone_alteration: '',
                intensity_alteration: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }

    if (therapyl == 4) {
      this.form.controls.external_ear.value;
      this.form.controls.middle_ear.value;
      this.form.controls.inner_ear.value;
      this.form.controls.observations.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.HearingTlS.Update({
            id: this.data.id,
            external_ear: this.form.controls.external_ear.value,
            middle_ear:this.form.controls.middle_ear.value,
            inner_ear: this.form.controls.inner_ear.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.HearingTlS.Save({
            external_ear: this.form.controls.external_ear.value,
            middle_ear:this.form.controls.middle_ear.value,
            inner_ear: this.form.controls.inner_ear.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                external_ear: '',
                middle_ear: '',
                inner_ear: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }

    if (therapyl == 5) {
      this.form.controls.phonetic_phonological.value;
      this.form.controls.syntactic.value;
      this.form.controls.morphosyntactic.value;
      this.form.controls.semantic.value;
      this.form.controls.pragmatic.value;
      this.form.controls.reception.value;
      this.form.controls.coding.value;
      this.form.controls.decoding.value;
      this.form.controls.production.value;
      this.form.controls.observations.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.LanguageTlS.Update({
            id: this.data.id,
            phonetic_phonological: this.form.controls.phonetic_phonological.value,
            syntactic:this.form.controls.syntactic.value,
            morphosyntactic: this.form.controls.morphosyntactic.value,
            semantic: this.form.controls.semantic.value,
            pragmatic:this.form.controls.pragmatic.value,
            reception: this.form.controls.reception.value,
            coding: this.form.controls.coding.value,
            decoding:this.form.controls.decoding.value,
            production: this.form.controls.production.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.LanguageTlS.Save({
            phonetic_phonological: this.form.controls.phonetic_phonological.value,
            syntactic:this.form.controls.syntactic.value,
            morphosyntactic: this.form.controls.morphosyntactic.value,
            semantic: this.form.controls.semantic.value,
            pragmatic:this.form.controls.pragmatic.value,
            reception: this.form.controls.reception.value,
            coding: this.form.controls.coding.value,
            decoding:this.form.controls.decoding.value,
            production: this.form.controls.production.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                phonetic_phonological: '',
                syntactic: '',
                morphosyntactic: '',
                pragmatic: '',
                reception: '',
                coding: '',
                decoding: '',
                production: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }
    if (therapyl == 6) {
      this.form.controls.eye_contact.value;
      this.form.controls.courtesy_rules.value;
      this.form.controls.communicative_intention.value;
      this.form.controls.communicative_purpose.value;
      this.form.controls.oral_verb_modality.value;
      this.form.controls.written_verb_modality.value;
      this.form.controls.nonsymbolic_nonverbal_modality.value;
      this.form.controls.symbolic_nonverbal_modality.value;
      this.form.controls.observations.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.CommunicationTlS.Update({
            id: this.data.id,
            eye_contact: this.form.controls.eye_contact.value,
            courtesy_rules:this.form.controls.courtesy_rules.value,
            communicative_intention: this.form.controls.communicative_intention.value,
            communicative_purpose: this.form.controls.communicative_purpose.value,
            oral_verb_modality:this.form.controls.oral_verb_modality.value,
            written_verb_modality: this.form.controls.written_verb_modality.value,
            nonsymbolic_nonverbal_modality: this.form.controls.nonsymbolic_nonverbal_modality.value,
            symbolic_nonverbal_modality:this.form.controls.symbolic_nonverbal_modality.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.CommunicationTlS.Save({
            eye_contact: this.form.controls.eye_contact.value,
            courtesy_rules:this.form.controls.courtesy_rules.value,
            communicative_intention: this.form.controls.communicative_intention.value,
            communicative_purpose: this.form.controls.communicative_purpose.value,
            oral_verb_modality:this.form.controls.oral_verb_modality.value,
            written_verb_modality: this.form.controls.written_verb_modality.value,
            nonsymbolic_nonverbal_modality: this.form.controls.nonsymbolic_nonverbal_modality.value,
            symbolic_nonverbal_modality:this.form.controls.symbolic_nonverbal_modality.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                eye_contact: '',
                courtesy_rules: '',
                communicative_intention: '',
                communicative_purpose: '',
                oral_verb_modality: '',
                written_verb_modality: '',
                nonsymbolic_nonverbal_modality: '',
                symbolic_nonverbal_modality: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }
   

    if (therapyl == 7) {
      this.form.controls.memory.value;
      this.form.controls.attention.value;
      this.form.controls.concentration.value;
      this.form.controls.observations.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.CognitiveTlS.Update({
            id: this.data.id,
            memory: this.form.controls.memory.value,
            attention:this.form.controls.attention.value,
            concentration: this.form.controls.concentration.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.CognitiveTlS.Save({
            memory: this.form.controls.memory.value,
            attention:this.form.controls.attention.value,
            concentration: this.form.controls.concentration.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                memory: '',
                attention: '',
                concentration: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }

    if (therapyl == 8) {
      this.form.controls.right_hermiface_symmetry.value;
      this.form.controls.right_hermiface_tone.value;
      this.form.controls.right_hermiface_sensitivity.value;
      this.form.controls.left_hermiface_symmetry.value;
      this.form.controls.left_hermiface_tone.value;
      this.form.controls.left_hermiface_sensitivity.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.OrofacialTlS.Update({
            id: this.data.id,
            right_hermiface_symmetry: this.form.controls.right_hermiface_symmetry.value,
            right_hermiface_tone:this.form.controls.right_hermiface_tone.value,
            right_hermiface_sensitivity: this.form.controls.right_hermiface_sensitivity.value,
            left_hermiface_symmetry: this.form.controls.left_hermiface_symmetry.value,
            left_hermiface_tone: this.form.controls.left_hermiface_tone.value,
            left_hermiface_sensitivity: this.form.controls.left_hermiface_sensitivity.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.OrofacialTlS.Save({
            right_hermiface_symmetry: this.form.controls.right_hermiface_symmetry.value,
            right_hermiface_tone:this.form.controls.right_hermiface_tone.value,
            right_hermiface_sensitivity: this.form.controls.right_hermiface_sensitivity.value,
            left_hermiface_symmetry: this.form.controls.left_hermiface_symmetry.value,
            left_hermiface_tone: this.form.controls.left_hermiface_tone.value,
            left_hermiface_sensitivity: this.form.controls.left_hermiface_sensitivity.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                memory: '',
                attention: '',
                concentration: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }

    if (therapyl == 9) {
      this.form.controls.breathing.value;
      this.form.controls.joint.value;
      this.form.controls.resonance.value;
      this.form.controls.fluency.value;
      this.form.controls.prosody.value;
      this.form.controls.observations.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.SpeechTlS.Update({
            id: this.data.id,
            breathing: this.form.controls.breathing.value,
            joint:this.form.controls.joint.value,
            resonance: this.form.controls.resonance.value,
            fluency:this.form.controls.fluency.value,
            prosody: this.form.controls.prosody.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.SpeechTlS.Save({
            breathing: this.form.controls.breathing.value,
            joint:this.form.controls.joint.value,
            resonance: this.form.controls.resonance.value,
            fluency:this.form.controls.fluency.value,
            prosody: this.form.controls.prosody.value,
            observations: this.form.controls.observations.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                breathing: '',
                joint: '',
                resonance: '',
                fluency: '',
                prosody: '',
                observations: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }


    if (therapyl == 10) {
      this.form.controls.hamilton_scale.value;
      this.form.controls.boston_test.value;
      this.form.controls.termal_merril.value;
      this.form.controls.prolec_plon.value;
      this.form.controls.ped_guss.value;
      this.form.controls.vhi_grbas.value;
      this.form.controls.pemo_speech.value;
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.showTable = false;
        this.loading = true;
        if (this.data.id) {
          await this.SpecificTestsTlS.Update({
            id: this.data.id,
            hamilton_scale: this.form.controls.hamilton_scale.value,
            boston_test:this.form.controls.boston_test.value,
            termal_merril: this.form.controls.termal_merril.value,
            prolec_plon: this.form.controls.prolec_plon.value,
            ped_guss:this.form.controls.ped_guss.value,
            vhi_grbas: this.form.controls.vhi_grbas.value,
            pemo_speech: this.form.controls.pemo_speech.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          await this.SpecificTestsTlS.Save({
            hamilton_scale: this.form.controls.hamilton_scale.value,
            boston_test:this.form.controls.boston_test.value,
            termal_merril: this.form.controls.termal_merril.value,
            prolec_plon: this.form.controls.prolec_plon.value,
            ped_guss:this.form.controls.ped_guss.value,
            vhi_grbas: this.form.controls.vhi_grbas.value,
            pemo_speech: this.form.controls.pemo_speech.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              this.messageEvent.emit(true);
              this.form.setValue({
                hamilton_scale: '',
                boston_test: '',
                termal_merril: '',
                prolec_plon: '',
                ped_guss: '',
                vhi_grbas: '',
                pemo_speech: '',
              });
              if (this.saved) {
                this.saved();
              }
            })
            .catch((x) => {
              this.isSubmitted = false;
              this.loading = false;
            });
        }
      }
    }


   
  

  }
}
