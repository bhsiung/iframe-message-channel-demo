import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class JobPostingController extends Controller {
  constructor() {
    super(...arguments);
    window.addEventListener('message', this.onMessage.bind(this));
  }

  onMessage(e) {
    if (e.data && e.data.signature === 'our secrete channel') {
      console.log(`message from parent window: ${e.data.message}`)
      this.messageAgent = e.ports[0]
      this.messageAgent.postMessage({
        message: 'Message back from the IFrame',
        signature: 'our secrete channel'
      });
    }
  }

  @action
  completeJobPosting() {
    this.messageAgent.postMessage({
      message: 'bye',
      action: 'close',
      signature: 'our secrete channel'
    });
  }
}
