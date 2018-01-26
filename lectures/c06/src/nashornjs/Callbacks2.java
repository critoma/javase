package nashornjs;

import java.util.ArrayList;
import java.util.List;

// For example: Let's assume that this interface is offered from your OS to be implemented
interface TimeUpdaterCallBack {
    void updateTime(long time);
}

// this is your implementation.
// for example: You want to update your website time every hour
class WebSiteTimeUpdaterCallBack implements TimeUpdaterCallBack {

    @Override
    public void updateTime(long time) {
        // print the updated time anywhere in your website's example
        System.out.println(time);
    }
}

// This is the SystemTimer implemented by your Operating System (OS)
// You don't know how this timer was implemented. This example just
// show to you how it could looks like. How you could implement a
// callback by yourself if you want to.
class SystemTimer {

    List<TimeUpdaterCallBack> callbacks = new ArrayList<TimeUpdaterCallBack>();

    public void registerCallBackForUpdatesEveryHour(TimeUpdaterCallBack timerCallBack) {
        callbacks.add(timerCallBack);
    }

    // ... This SystemTimer may have more logic here we don't know ...

    // At some point of the implementaion of this SystemTimer (you don't know)
    // this method will be called and every registered timerCallBack
    // will be called. Every registered timerCallBack may have a totally
    // different implementation of the method updateTime() and my be
    // used in different ways by different clients.
    public void oneHourHasBeenExprired() {
	try { Thread.sleep(3000); } // 1000 ms = 1 s 
	catch(InterruptedException ie) { ie.printStackTrace(); }

        for (TimeUpdaterCallBack timerCallBack : callbacks) {
            timerCallBack.updateTime(System.currentTimeMillis());
        }
    }
}

// This is our client. It will be used in our WebSite example. It shall update
// the website's time every hour.
class WebSiteTimeUpdater {

    public static void main(String[] args) {
        SystemTimer systemTimer = new SystemTimer();
        TimeUpdaterCallBack webSiteCallBackUpdater = new WebSiteTimeUpdaterCallBack();
        systemTimer.registerCallBackForUpdatesEveryHour(webSiteCallBackUpdater);

	systemTimer.oneHourHasBeenExprired();
    }
}




