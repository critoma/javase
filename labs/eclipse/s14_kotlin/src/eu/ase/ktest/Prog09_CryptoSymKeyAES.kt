package eu.ase.ktest


import java.util.*;
import java.security.*

// here is the Cipher class
import javax.crypto.*
import javax.crypto.spec.*

class CryptoJAES
{
    fun aesCryptoECB(inputdata: ByteArray, key: ByteArray, mode: Int): ByteArray? 
    {
        try {
            val cipher = Cipher.getInstance("AES/ECB/NoPadding")
            val secretKeySpec = SecretKeySpec(key, "AES")
            
            if (mode == 0) {
            		cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec)
            } else {
                cipher.init(Cipher.DECRYPT_MODE, secretKeySpec)
            }
            
            return cipher.doFinal(inputdata)
            
        } catch (e: Exception) {
            e.printStackTrace()
        }

        return null
    }
	
	fun aesCryptoCBC(inputData: ByteArray, key: ByteArray, ivs: ByteArray, mode: Int): ByteArray? 
    {
        try {
            val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
            val secretKeySpec = SecretKeySpec(key, "AES")
            val finalIvs = ByteArray(16)
            
			val len = if (ivs.size > 16) 16 else ivs.size
            System.arraycopy(ivs, 0, finalIvs, 0, len)
            val ivps = IvParameterSpec(finalIvs)
			
            if (mode == 0) {
            		cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivps)
            } else {
                cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivps)
            }
			
            return cipher.doFinal(inputData)
        } catch (e: Exception) {
            e.printStackTrace()
        }

        return null
    } 
}

fun main(args: Array<String>) {
    val testText = "Hey! Java/Kotlin"
	val password = "password#1234567"
	val iv = "12345678"
    
    var c = CryptoJAES()
    var encryptTextBytes = c.aesCryptoECB(testText.toByteArray(), password.toByteArray(), 0)
	println("test enc...\n" + Base64.getEncoder().encodeToString(encryptTextBytes) )
	
	var decryptTextBytes = c.aesCryptoECB(encryptTextBytes!!, password.toByteArray(), 1)
	println("test dec...\n" + decryptTextBytes!!.toString(Charsets.ISO_8859_1) )
	
	var encryptTextBytesCbc = c.aesCryptoCBC(testText.toByteArray(), password.toByteArray(), iv.toByteArray(), 0)
	println("test enc...\n" + Base64.getEncoder().encodeToString(encryptTextBytesCbc) )
	
	var decryptTextBytesCbc = c.aesCryptoCBC(encryptTextBytesCbc!!, password.toByteArray(), iv.toByteArray(), 1)
	println("test dec...\n" + decryptTextBytesCbc!!.toString(Charsets.ISO_8859_1) )
	
}
