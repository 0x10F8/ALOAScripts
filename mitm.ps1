
$regKey="HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings"
$proxy="192.168.0.15:8080"
$certFileURL="https://github.com/0x10F8/ALOAScripts/blob/master/resources/burp_cert.der?raw=true"
$tempFile = New-TemporaryFile

Invoke-WebRequest -Uri $certFileURL -OutFile $tempFile
$certfile = ( Get-ChildItem -Path $tempFile )
$certfile | Import-Certificate -CertStoreLocation cert:\CurrentUser\Root

Set-ItemProperty -path $regKey ProxyEnable -value 1
Set-ItemProperty -path $regKey ProxyServer -value $proxy