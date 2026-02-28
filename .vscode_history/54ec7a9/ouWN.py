#!/usr/bin/env python3
"""
Simple HTTP Server Starter
Serves the portfolio website on http://localhost:3000
No dependencies required - Python 3 only
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

PORT = 3000
SCRIPT_DIR = Path(__file__).parent.absolute()

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server():
    os.chdir(SCRIPT_DIR)
    
    Handler = MyHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n{'='*60}")
        print(f"Portfolio Server Started!")
        print(f"{'='*60}")
        print(f"\n✅ Open this link in your browser:")
        print(f"   http://localhost:{PORT}")
        print(f"\n📁 Serving files from:")
        print(f"   {SCRIPT_DIR}")
        print(f"\n💡 Press Ctrl+C to stop the server\n")
        
        # Try to open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✅ Server stopped. Goodbye!")
            sys.exit(0)

if __name__ == "__main__":
    # Check if port is already in use
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', PORT))
    sock.close()
    
    if result == 0:
        print(f"❌ Error: Port {PORT} is already in use!")
        print(f"   Either:")
        print(f"   1. Close the app using port {PORT}")
        print(f"   2. Edit this file and change PORT = 3000 to another number")
        sys.exit(1)
    
    try:
        start_server()
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
