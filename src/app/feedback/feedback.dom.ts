
export const enum FeedbackMessageType {

  INFO,
  SUCCESS,
  ERROR,
}

export class FeedbackMessage {

  alertType: string;
  timeout = 0;

  constructor(public id: number, public type: FeedbackMessageType, public message: string) {

    if (type === FeedbackMessageType.ERROR) {
      this.alertType = 'danger';
    }
    if (type === FeedbackMessageType.INFO) {
      this.alertType = 'info';
    }
    if (type === FeedbackMessageType.SUCCESS) {
      this.alertType = 'success';
    }

  }

  isError() {
    return this.type === FeedbackMessageType.ERROR;
  }

  isSuccess() {
    return this.type === FeedbackMessageType.SUCCESS;
  }

  isInfo() {
    return this.type === FeedbackMessageType.INFO;
  }
}
