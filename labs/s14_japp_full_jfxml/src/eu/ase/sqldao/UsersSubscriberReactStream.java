package eu.ase.sqldao;

import java.util.concurrent.Flow;
import java.util.concurrent.Flow.Subscription;

import eu.ase.iojson.User;

public class UsersSubscriberReactStream implements Flow.Subscriber<User> {
	private SqlDAO sqlOb;
	private Subscription subscription;

	public UsersSubscriberReactStream() {
		super();
		this.sqlOb = SqlDAO.getInstance();
	}

	@Override
	public void onSubscribe(Subscription subscription) {
		System.out.printf("onSubscribe(...) - new subscription %s\n", subscription);
		this.subscription = subscription;
		subscription.request(1);
	}

	@Override
	public void onNext(User item) {
		System.out.printf("onNext(...) - user received: %s \n", item.toString());

		sqlOb.insertIntoDB(item.getId(), item.getName(), item.getEmail(), item.getPassword());
		subscription.request(1);
	}
	
	public void cancelSubscription() {
		subscription.cancel();
	}

	@Override
	public void onError(Throwable throwable) {
		System.err.printf("error occurred fetching user: %s\n", throwable.getMessage());
		throwable.printStackTrace(System.err);

	}

	@Override
	public void onComplete() {
		System.out.println("fetching user completed");
	}
}
