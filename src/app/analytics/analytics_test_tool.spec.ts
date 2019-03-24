export function fakeAnalyticsService() {

  return jasmine.createSpyObj('AnalyticsService', ['userLoggedIn']);

}
