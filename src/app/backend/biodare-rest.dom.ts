export class BioDareEndPoints {

  login_url: string;
  logout_url: string;
  user_url: string;

  user_register_url: string;
  user_update_url: string;
  user_activate_url: string;
  user_requestreset_url: string;
  user_reset_url: string;
  user_available_login_url: string;
  user_academic_email_url: string;
  user_suitable_email_url: string;

  experiment_new_draft_url: string;
  experiment_new_experiment_url: string;
  experiment_url: string;
  experiments_url: string;

  rdmSocial: string;

  ts_import: string;
  ts_data: string;

  ppa_new: string;
  ppa_job: string;
  ppa_jobs: string;
  ppa_stats: string;
  ppa_results: string;
  ppa_results_export: string;

  rhythmicity_new: string;
  rhythmicity_jobs: string;
  rhythmicity_job: string;

  publish: string;

  file_part: string;
  file_upload_url: string;

  file_url: string;
  view_simple_table: string;
  view_verify_format: string;
  view_table_slice: string;

  ontology_url: string;
  ontology_species_url: string;
}

export function bioDareRestConfigurator(environment: any): BioDareEndPoints {

  if (!environment.backendUrl) {
    console.error('Missing backendURL', environment);
    throw new Error('Missing configuration for backendURL');
  }

  const backendRoot = environment.backendUrl;

  console.log('Making new endpoints for ' + backendRoot);
  const endPoints = new BioDareEndPoints();

  endPoints.user_url = backendRoot + '/user';
  endPoints.login_url = endPoints.user_url;
  endPoints.logout_url = backendRoot + '/logout';

  endPoints.user_available_login_url = backendRoot + '/account/available-login';
  endPoints.user_academic_email_url = backendRoot + '/account/academic-email';
  endPoints.user_suitable_email_url = backendRoot + '/account/suitable-email';

  endPoints.user_register_url = backendRoot + '/account';
  endPoints.user_activate_url = backendRoot + '/account/activate';
  endPoints.user_requestreset_url = backendRoot + '/account/remind';
  endPoints.user_reset_url = backendRoot + '/account/reset';

  endPoints.user_update_url = endPoints.user_register_url;

  endPoints.experiment_new_draft_url = backendRoot + '/' + 'experiment/draft';
  endPoints.experiment_new_experiment_url = backendRoot + '/' + 'experiment';
  endPoints.experiment_url = backendRoot + '/' + 'experiment';
  endPoints.experiments_url = backendRoot + '/' + 'experiments';

  endPoints.rdmSocial = '/rdm';

  endPoints.ts_import = '/data/ts-import';
  endPoints.ts_data = '/data';

  endPoints.ppa_new = '/ppa2';
  endPoints.ppa_job = '/ppa2/job';
  endPoints.ppa_jobs = '/ppa2/jobs';
  endPoints.ppa_stats = '/ppa2/stats';
  endPoints.ppa_results = '/ppa2/results';
  endPoints.ppa_results_export = '/ppa2/export';

  endPoints.rhythmicity_new = '/rhythmicity';
  endPoints.rhythmicity_jobs = '/rhythmicity/jobs';
  endPoints.rhythmicity_job = '/rhythmicity/job';

  endPoints.publish = '/publish';

  endPoints.file_part = '/file';

  endPoints.file_upload_url = backendRoot + '/' + 'upload/one';

  endPoints.file_url = backendRoot + '/' + 'file';
  endPoints.view_simple_table = '/view/simpletable';
  endPoints.view_verify_format = '/verify/format/';
  endPoints.view_table_slice = '/view/tableslice/';

  endPoints.ontology_url = backendRoot + '/onto';
  endPoints.ontology_species_url = endPoints.ontology_url + '/species';
  return endPoints;

}

