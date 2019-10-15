import {Injectable} from '@angular/core';
import {BioDareEndPoints} from './biodare-rest.dom';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SystemEventsService} from '../system/system-events.service';
import {BD2User} from '../auth/user.dom';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {FileImportRequest, ImportFormat} from '../experiment/ts-data/import-dom';
import {DetrendingType} from '../tsdata/ts-data-dom';
import {PPARequest} from '../experiment/ppa/ppa-dom';
import {RhythmicityRequest} from '../experiment/rhythmicity/rhythmicity-dom';
import {Slice} from '../experiment/ts-data/tsimport-dashboard/data-table-dom';

@Injectable({
  providedIn: 'root'
})
export class BioDareRestService {

  constructor(private endPoints: BioDareEndPoints,
              private systemEvents: SystemEventsService,
              private http: HttpClient) {

  }

  // it is static as the this was missinging in handleBadResponse
  public static extractMessage(resp: HttpErrorResponse, def: string): string {
    if (!resp) {
      return '' + def;
    }

    if (resp.error && resp.error.message) {
      return resp.error.message;
    }

    if (resp.message) {
      return resp.message + ':' + def;
    }

    return def;
  }

  login(username: string, password: string): Observable<BD2User> {

    const options = this.makeOptions();

    // must be like this as headers are immutatble
    options.headers = options.headers.append('authorization',
      'Basic ' + btoa(username + ':' + password));
    options.headers = options.headers.append('X-Requested-With',
      'XMLHttpRequest'); // to prevent the basic auth popup

    const url = this.endPoints.login_url;

    return this.OKJson(this.http.get<BD2User>(url, options));

  }

  logout(): Observable<boolean> {
    const options = this.makeOptions();
    const url = this.endPoints.logout_url;

    return this.OK(this.http.post(url, undefined, options));
  }

  refreshUser(): Observable<BD2User> {
    const options = this.makeOptions();
    const url = this.endPoints.user_url;

    return this.OKJson(this.http.get<BD2User>(url, options));

  }

  userActivate(token: string): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.user_activate_url;
    const body = token;

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  userRequestReset(identifier: string, gRecaptchaResponse: string): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.user_requestreset_url;

    const body = {identifier, g_recaptcha_response: gRecaptchaResponse};

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  userResetPassword(password: string, token: string): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.user_reset_url;
    const body = {password, token};

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  userAvailableLogin(login: string): Promise<boolean> {
    const options = this.makeOptions();
    const url = this.endPoints.user_available_login_url;
    const body = login;

    return this.OKBoolean(this.http.post<string>(url, login, options)).toPromise();
  }

  userAcademicEmail(email: string): Promise<boolean> {
    const options = this.makeOptions();
    const url = this.endPoints.user_academic_email_url;
    const body = email;

    return this.OKBoolean(this.http.post<string>(url, body, options)).toPromise();
  }

  userSuitableEmail(email: string): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.user_suitable_email_url;
    const body = email;

    return this.OKJson(this.http.post(url, body, options)).toPromise();
  }


  userRegister(user: any): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.user_register_url;
    const body = user;

    return this.OKJson(this.http.put(url, body, options)).toPromise();

  }

  userUpdate(user: any): Observable<any> {
    const options = this.makeOptions();
    const url = this.endPoints.user_update_url;
    const body = user;

    return this.OKJson(this.http.post(url, body, options));

  }

  /* experiments */

  experiments(onlyOwned = true): Promise<any> {
    const options = this.makeOptions() as any;
    options.params = options.params || new HttpParams();
    options.params = options.params.set('onlyOwned', '' + onlyOwned);
    const url = this.endPoints.experiments_url;

    return this.OKJson(this.http.get(url, options)).toPromise();

  }

  experimentNewDraft(): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_new_draft_url;

    return this.OKJson(this.http.get(url, options)).toPromise();

  }

  experimentNewExperiment(exp: ExperimentalAssayView): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_new_experiment_url;
    const body = exp;

    return this.OKJson(this.http.put(url, body, options)).toPromise();

  }

  experiment(expId: number): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId;

    return this.OKJson(this.http.get(url, options)).toPromise();

  }

  experimentSave(exp: ExperimentalAssayView): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id;
    const body = exp;

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  experimentPublish(exp: ExperimentalAssayView, license: string): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.publish;
    const body = JSON.stringify(license);

    return this.OKJson(this.http.put(url, body, options)).toPromise();

  }

  /* experiments */

  /* data */

  tsdataExportURL(exp: ExperimentalAssayView, detrending: DetrendingType): string {
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.ts_data + '/' + detrending.name + '/export';
    return url;
  }

  tsdata(exp: ExperimentalAssayView, detrending: DetrendingType): Promise<any> {

    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.ts_data + '/' + detrending.name;

    return this.OKJson(this.http.get(url, options)).toPromise();
  }

  experimentImportTS(exp: ExperimentalAssayView, request: FileImportRequest): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.ts_import;
    const body = request;

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  /* data */

  /* ppa */

  ppaNew(exp: ExperimentalAssayView, request: PPARequest): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.ppa_new;
    const body = request;

    return this.OKJson(this.http.put(url, body, options)).toPromise();

  }

  ppaJob(expId: number, jobId: number): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId;

    return this.OKJson(this.http.get(url, options)).toPromise();
  }

  ppaExportJob(expId: number, jobId: number, phaseType: string): Promise<any> {
    const options = this.makeOptions();
    options.headers = options.headers.delete('Content-Type');
    (options as any).responseType  = 'blob'; // ResponseContentType.Blob;

    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId + '/export/' + phaseType;

    // return this.OK(this.http.get(url, options).toPromise());

    return this.http.get(url, options).pipe(
      catchError(this.handleBadResponse)
      )
      .toPromise();
  }

  ppaDeleteJob(expId: number, jobId: number): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId;

    return this.OKJson(this.http.delete(url, options)).toPromise();
  }


  ppaJobResultsGrouped(expId: number, jobId: number): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId + '/results/grouped';

    return this.OKJson(this.http.get(url, options)).toPromise();

  }

  ppaJobSimpleResults(expId: number, jobId: number): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId + '/results/simple';

    return this.OKJson(this.http.get(url, options)).toPromise();
  }

  ppaJobSimpleStat(expId: number, jobId: number): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId + '/stats/simple';

    return this.OKJson(this.http.get(url, options)).toPromise();

  }

  ppaForSelect(expId: number, jobId: number): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId + '/results/select';

    return this.OKJson(this.http.get(url, options)).toPromise();
  }

  ppaDoSelection(expId: number, jobId: number, selection: any): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId + '/results/select';
    const body = selection;

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  ppaFit(expId: number, jobId: number, dataId: number, selectable: boolean): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_job + '/' + jobId + '/fits/' + dataId + '/' + selectable;

    return this.OKJson(this.http.get(url, options)).toPromise();
  }


  ppaJobs(exp: ExperimentalAssayView): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.ppa_jobs;

    return this.OKJson(this.http.get(url, options)).toPromise();
  }

  ppaResults(exp: ExperimentalAssayView): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.ppa_results;

    return this.OKJson(this.http.get(url, options)).toPromise();
  }

  ppaExportURL(expId: number): string {
    return this.endPoints.experiment_url + '/' + expId + this.endPoints.ppa_results_export;
  }


  /* ppa */

  /* rhythmicity */

  rhythmicityNew(exp: ExperimentalAssayView, request: RhythmicityRequest): Observable<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.rhythmicity_new;
    const body = request;

    return this.OKJson(this.http.put(url, body, options));

  }

  rhythmicityJobs(exp: ExperimentalAssayView): Observable<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.rhythmicity_jobs;

    return this.OKJson(this.http.get(url, options));
  }

  rhythmicityJob(expId: number, jobId: string): Observable<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.rhythmicity_job + '/' + jobId;

    return this.OKJson(this.http.get(url, options));
  }

  rhythmicityResults(expId: number, jobId: string): Observable<any> {

    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.rhythmicity_job + '/' + jobId + '/results';

    return this.OKJson(this.http.get(url, options));
  }

  rhythmicityDeleteJob(expId: number, jobId: string): Observable<any> {
    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.rhythmicity_job + '/' + jobId;

    return this.OKJson(this.http.delete(url, options));
  }

  rhythmicityExportJob(expId: number, jobId: string): Observable<any> {
    const options = this.makeOptions();
    options.headers = options.headers.delete('Content-Type');
    (options as any).responseType  = 'blob'; // ResponseContentType.Blob;

    const url = this.endPoints.experiment_url + '/' + expId + this.endPoints.rhythmicity_job + '/' + jobId + '/export/';

    // return this.OK(this.http.get(url, options).toPromise());

    return this.http.get(url, options).pipe(
      catchError(this.handleBadResponse)
    );
  }

  /* rhythmicity */

  /* files */

  fileURL(parrent: ExperimentalAssayView, fileId: any): string {
    const url = this.endPoints.experiment_url + '/' + parrent.id + this.endPoints.file_part + '/' + fileId;
    return url;
  }

  files(parrent: ExperimentalAssayView): Promise<any> {

    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + parrent.id + this.endPoints.file_part;

    return this.OKJson(this.http.get(url, options)).toPromise();

  }

  expFileUpload(exp: ExperimentalAssayView, formData: FormData): Promise<any> {

    const options = this.makeOptions();
    options.headers = options.headers.delete('Content-Type');
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.file_part;
    const body = formData;

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  fileUpload(formData: FormData): Promise<any> {
    const options = this.makeOptions();
    options.headers = options.headers.delete('Content-Type');
    const url = this.endPoints.file_upload_url;
    const body = formData;

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  fileUpdate(url: string, formData: FormData): Promise<any> {

    const options = this.makeOptions();
    options.headers = options.headers.delete('Content-Type');
    // let url = this.endPoints.file_upload_url;
    const body = formData;

    return this.OKJson(this.http.post(url, body, options)).toPromise();

  }

  fileViewSimpleTable(fileId: string): Promise<any> {
    const options = this.makeOptions();
    const url = this.endPoints.file_url + '/' + fileId + this.endPoints.view_simple_table;

    return this.OKJson(this.http.get(url, options)).toPromise();

  }

  fileViewVerifyFormat(format: ImportFormat, fileId: string): Observable<boolean> {
    const options = this.makeOptions();
    const url = this.endPoints.file_url + '/' + fileId + this.endPoints.view_verify_format + format.name;

    return this.OK(this.http.get(url, options));

  }

  fileViewTableSlice(fileId: string, format: string, slice: Slice): Observable<any> {
    const options = this.makeOptions();
    const url = this.endPoints.file_url + '/' + fileId + this.endPoints.view_table_slice + format;
    const body = slice;
    return this.OKJson(this.http.post(url, body, options));

  }

  /* files */

  /* rdm aspects */

  rdmAssayGuiAspects(exp: ExperimentalAssayView): Promise<any> {

    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.rdmSocial + '/gui-aspects';

    return this.OKJson(this.http.get(url, options)).toPromise();
  }

  rdmRegisterWarning(exp: ExperimentalAssayView, category: string): Promise<boolean> {

    const options = this.makeOptions();
    const url = this.endPoints.experiment_url + '/' + exp.id + this.endPoints.rdmSocial + '/register/warning/' + category;

    return this.OK(this.http.put(url, '', options)).toPromise();

  }

  /* rdm aspects */

  species(): Observable<string[]> {

    const options = this.makeOptions();
    const url = this.endPoints.ontology_species_url;

    return this.OKJson(this.http.get<string[]>(url, options));

  }

  protected makeOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
      // 'X-Requested-With':'XMLHttpRequest' // to prevent the basic auth popup
    });

    return {
      headers,
      withCredentials: true
    };
  }

  protected OKJson<T>(resp$: Observable<T>): Observable<T> {

    return resp$.pipe(
      catchError(err => this.handleBadResponse(err))
    );
  }


  protected OK(resp$: Observable<any>): Observable<boolean> {

    return resp$.pipe(
      map(_ => true),
      catchError( err => this.handleBadResponse(err))
    );
  }

  protected OKBoolean(resp$: Observable<any>): Observable<boolean> {

    return resp$.pipe(
      map(resp => {
        if (resp.body) {
          resp = resp.body;
        }
        if (resp === true || resp === 'true') {
          return true;
        }
        if (resp === false || resp === 'false') {
          return false;
        }
        throw Error('Not boolean response: ' + resp);
      }),
      catchError(err => this.handleBadResponse(err))
    );

  }

  protected handleBadResponse(resp: HttpErrorResponse) {
    // console.log('HandleBadResponse: '+resp.status+'; '+resp.statusText);
    // console.log('Body: '+resp.text());
    // console.log('RESP: '+JSON.stringify(resp));
    // console.log('E: '+resp.text());
    // console.log("BR",resp);

    console.error('Response error', resp);


    let message: string;

    switch (resp.status) {
      case 401: {
        message = 'Bad credentials, locked or not activated account';
        break;
      }
      case 403: {
        console.log('Unauthorised');
        this.systemEvents.emitUnauthorised(resp.url);

        // must be static call as this is not defined in the pipe ??? why???
        message = BioDareRestService.extractMessage(resp, 'Unauthorized');
        break;
      }
      case 400: {
        message = BioDareRestService.extractMessage(resp, 'Handling error');
        break;
      }
      default: {
        message = BioDareRestService.extractMessage(resp, 'No error details');
      }

    }
    return throwError(message);
  }


}
