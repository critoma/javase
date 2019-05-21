#include "./ReadFile.h"
#include <malloc.h>
#include <stdio.h>

JNIEXPORT jbyteArray JNICALL Java_ReadFile_loadFileInMemory (JNIEnv* env, jobject jobj, jstring name)
{
	jbyteArray jb;
	unsigned char *buf;
	int len = 0;
	jboolean iscopy;
    	const char *mfile = (*env)->GetStringUTFChars(env, name, &iscopy);
    	FILE* f = fopen(mfile, "r");

	fseek(f, 0, 2); // SEEK_END = 2 
	len = ftell(f); 
	buf = (unsigned char*)malloc(len*sizeof(char));
	fseek(f, 0, 0); // SEEK_SET = 0
	
	jb=(*env)->NewByteArray(env, len);
	
	fread(buf, sizeof(char), len, f);
	
	printf( "Contents of buffer = %s\n len=%d\n", buf, len );

	(*env)->SetByteArrayRegion(env, jb, 0, len, (jbyte *)buf);	
  
	fclose(f);
	free(buf);
    	(*env)->ReleaseStringUTFChars(env, name, mfile);

	return (jb);

}

