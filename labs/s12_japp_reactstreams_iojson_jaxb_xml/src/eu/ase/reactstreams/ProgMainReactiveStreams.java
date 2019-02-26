package eu.ase.reactstreams;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.Flow;
import java.util.concurrent.Flow.Subscription;
import java.util.concurrent.SubmissionPublisher;

class JSONData {
	 
	private final String headline;
	private final LocalDate date;
	
	private JSONData(String headline, LocalDate ld) {
		this.headline = headline;
		this.date = ld;
	}
 
	public static JSONData create(String headline) {
	  return new JSONData(headline, LocalDate.now());
	}

	public String getHeadline() {
		return headline;
	}

	public LocalDate getDate() {
		return date;
	}
 
	// getter, setter, constructor omitted
}
 
class NewsSubscriber implements Flow.Subscriber<JSONData> {
	 
    private Subscription subscription;
    private static final int MAX_NEWS = 3;
    private int newsReceived = 0;
 
    @Override
    public void onSubscribe(Subscription subscription) {
      System.out.printf("new subscription %s\n", subscription);
      this.subscription = subscription;
      subscription.request(1);
    }
 
    @Override
    public void onNext(JSONData item) {
      System.out.printf("news received: %s (%s)\n", item.getHeadline(), item.getDate());
      newsReceived++;
      if (newsReceived >= MAX_NEWS) {
        System.out.printf("%d news received (max: %d), cancelling subscription\n", newsReceived, MAX_NEWS);
        subscription.cancel();
        return;
      }
 
      subscription.request(1);
 
    }
 
    @Override
    public void onError(Throwable throwable) {
      System.err.printf("error occurred fetching news: %s\n", throwable.getMessage());
      throwable.printStackTrace(System.err);
 
    }
 
    @Override
    public void onComplete() {
      System.out.println("fetching news completed");
    }
  }

public class ProgMainReactiveStreams {
	
  //static 
 
  public static void main(String[] args) {
    try (SubmissionPublisher<JSONData> newsPublisher = new SubmissionPublisher()) {
 
      NewsSubscriber newsSubscriber = new NewsSubscriber();
      newsPublisher.subscribe(newsSubscriber);
 
      List.of(JSONData.create("Important news"), JSONData.create("Some other news"),
          JSONData.create("And news, news, news")).forEach(newsPublisher::submit);
 
      while (newsPublisher.hasSubscribers()) {
        // wait
      }
      System.out.println("no more news subscribers left, closing publisher..");
    }
  }
}
