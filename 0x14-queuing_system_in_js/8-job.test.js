import kue from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job';

const queue = kue.createQueue();

const list = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 5675 to verify your account',
  },
];
createPushNotificationsJobs(list, queue);

describe('createPushNotificationsJobs', () => {
  before(() => {
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
  });

  after(() => queue.testMode.exit());

  it('throws an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('', queue)).to.throw(Error);
  });

  it('display a error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('', queue)).to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', () => {
    createPushNotificationsJobs(list, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.eql(list[0]);
    expect(queue.testMode.jobs[1].data).to.eql(list[1]);
  });
});
