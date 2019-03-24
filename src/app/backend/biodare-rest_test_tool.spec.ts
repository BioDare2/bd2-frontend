export function fakeBioDareRestService() {
  return jasmine.createSpyObj('BioDareRestService', ['login', 'logout']);
}
