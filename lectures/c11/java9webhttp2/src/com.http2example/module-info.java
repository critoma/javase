module com.http2example {
	// this module only needs types from the base module 'java.base';
    // because every Java module needs 'java.base', it is not necessary
    // OPTIONAL to explicitly require it - do it nonetheless for demo purposes
    requires java.base;
    requires jdk.incubator.httpclient;
    // this export makes little sense for the application,
    // but once again, this is for demo purposes
    // OPTIONAL:
    exports com.http2example;
}
