import Controller from '@ember/controller';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class IndexController extends Controller {
  isPosting = false

  onMessage(e) {
    console.log(`message from sub-page: ${e.data.message}`)
    if (e.data.action === 'close') {
      this.channel = null
      this.set('isPosting', false)
    }
  }

  @action
  startPosting() {
    this.set('isPosting', true)
    if (this.channel) return

    later(this, function() {
      this.channel = new MessageChannel();
      const iframe = document.querySelector('iframe');

      this.channel.port1.onmessage = this.onMessage.bind(this);
      iframe.addEventListener("load", () => {
        iframe.contentWindow.postMessage({
          message: 'Hello from the main page!',
          signature: 'our secrete channel'
        }, '*', [this.channel.port2]);
      });
    })
  }
}
