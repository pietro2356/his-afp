import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FlexColP } from '../../core/directive/flex-col-p';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { PazienteCreateDTO } from '../../core/Pazienti/Pazienti.model';
import { FieldTree, form, FormField, required } from '@angular/forms/signals';
import { Button } from 'primeng/button';
import { FormInput } from '../../ui/form-input/form-input';
import { Message } from 'primeng/message';
import { DatePicker } from 'primeng/datepicker';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'his-accettazione-pz',
  imports: [
    FlexColP,
    Select,
    Textarea,
    Button,
    FormField,
    FormInput,
    Message,
    DatePicker,
    JsonPipe,
    DatePipe,
  ],
  templateUrl: './accettazione-pz.html',
  styleUrl: './accettazione-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccettazionePz {
  patologie = signal<string[]>(['Trauma', 'Cardiopatia', 'Ictus', 'Altro']);
  codColore = signal(['BIANCO', 'VERDE', 'AZZURRO', 'ARANCIONE', 'ROSSO']);
  modArrivo = signal<string[]>(['AMBULANZA', 'AUTOMOBILE', 'A PIEDI', 'ALTRO']);

  newPZModel = signal<PazienteCreateDTO>({
    codiceColore: '',
    codiceFiscale: '',
    cognome: '',
    dataNascita: '',
    modalitaArrivoCode: '',
    nome: '',
    noteTriage: '',
    patologiaCode: '',
    sex: '',
  });

  pzForm = form(this.newPZModel, (sPath) => {
    required(sPath.nome, { message: 'Il nome è obbligatorio' });
    required(sPath.cognome, { message: 'Il cognome è obbligatorio' });
    // VALIDAZIONE DATEPICKER NON POSSIBILE
    // DOCUMENTAZIONE A FONDO FILE
    // required(sPath.dataNascita, { message: 'La data di nascita è obbligatoria' });
    // required(sPath.dataNascita, {
    //   when: ({ valueOf }) => !isNaN(Date.parse(valueOf(sPath.dataNascita))),
    //   message: 'La data di nascita deve essere una data valida',
    // });
    required(sPath.codiceFiscale, { message: 'Il codice fiscale è obbligatorio' });
    required(sPath.patologiaCode, { message: 'La patologia è obbligatoria' });
    required(sPath.codiceColore, { message: 'Il codice colore è obbligatorio' });
    required(sPath.modalitaArrivoCode, { message: 'La modalità di arrivo è obbligatoria' });
  });

  public save() {
    console.log(this.pzForm());
    console.table({
      error: this.pzForm().errors() || 'none',
      valid: this.pzForm().valid(),
      dirty: this.pzForm().dirty(),
    });
  }

  public checkFormFieldValidity(ff: FieldTree<string, string>): boolean {
    if (ff().touched() && ff().invalid()) return true;
    return false;
  }
}

/**
 * La validazione del DatePicker attualmente non è possibile con le forms basate sui signal di Angular,
 * in quanto il componente di PrimeNG emette un oggetto Date,
 * che non è compatibile con la validazione built-in di Angular che si aspetta una stringa.
 * Per ovviare a questo problema, è possibile implementare una validazione personalizzata che verifica se il valore del
 * DatePicker è un oggetto Date valido.
 *
 * In alternativa, si potrebbe considerare l'utilizzo di un altro componente di input per le date che sia compatibile
 * con le forms reattive di Angular.
 * RIF: https://github.com/angular/angular/issues/65468
 *
 *
 */
