import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, first, map, of, switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { GestioneStaff } from './gestione-staff';

export function usernameDisponibileValidator(gestioneStaff: GestioneStaff): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return control.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((value: string) =>
        gestioneStaff.checkUsernameAvailability(value).pipe(
          map((res) => (res.data.available ? null : { usernameNonDisponibile: true })),
          catchError(() => of(null)),
        ),
      ),
      first(),
    );
  };
}
