# Custom Dev Tunnel Setup for Ravi Vastu

## Install Dev Tunnels (First Time Only)

Run this command in PowerShell as Administrator:
```powershell
winget install Microsoft.devtunnel
```

Or run: `install-devtunnel.bat`

## Setup Your Custom Tunnel

After installation, run these commands:

```bash
# 1. Create named tunnel
devtunnel create ravi-vastu --allow-anonymous

# 2. Add port 3000
devtunnel port create ravi-vastu -p 3000

# 3. Start hosting
devtunnel host ravi-vastu
```

Or simply run: `setup-tunnel.bat`

## Start Your App Daily

Run: `start-ravi-vastu.bat`

Your URL will be: **https://ravi-vastu-XXXXX.devtunnels.ms/**

## Alternative: Use Existing Tunnel

If you're already using VS Code dev tunnels, just run:
```bash
devtunnel host
```

Then select port 3000 when prompted.
