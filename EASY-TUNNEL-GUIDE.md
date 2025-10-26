# Easy Ways to Get Custom URL for Ravi Vastu

## ✅ Method 1: VS Code Port Forwarding (EASIEST - Already Installed!)

1. Run: `use-vscode-tunnel.bat`
2. In VS Code: Press `Ctrl+Shift+P`
3. Type: `Forward a Port`
4. Enter: `3000`
5. Right-click port → `Port Visibility` → `Public`
6. Copy the URL (will be like: `https://xxxxx-3000.app.github.dev`)

## ✅ Method 2: ngrok (Free & Simple)

1. Download: https://ngrok.com/download
2. Extract ngrok.exe to: `C:\Windows\System32\`
3. Run: `use-ngrok.bat`
4. Copy the URL shown (like: `https://xxxx.ngrok.io`)

## ✅ Method 3: localtunnel (No Installation)

```bash
npx localtunnel --port 3000 --subdomain ravi-vastu
```

URL: `https://ravi-vastu.loca.lt`

## ✅ Method 4: Keep Current Tunnel

Your current URL works fine: `https://fw6kdmqt-3001.inc1.devtunnels.ms/`

Just update Flutter app to use this URL.

## 🎯 Recommended: Use Method 1 (VS Code)

It's already installed and works immediately!
