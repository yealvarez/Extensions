<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README - WAF Hunter (Beta)</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1, h2 {
            color: #333;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        code {
            font-family: "Courier New", Courier, monospace;
            color: #d63384;
        }
        ul {
            margin-left: 20px;
        }
    </style>
</head>
<body>

    <h1>WAF Hunter (Beta)</h1>

    <p><strong>WAF Hunter</strong> is a beta Chrome extension designed to identify some of the most well-known Web Application Firewalls (WAFs) on web applications. It aims to assist security researchers, developers, and IT professionals in recognizing the presence of WAFs and simplifying web security analysis.</p>

    <h2>Features</h2>
    <ul>
        <li>Identification of popular WAFs.</li>
        <li>Quick scan of visited websites.</li>
        <li>Visual indicator of WAF presence in the toolbar.</li>
        <li>Basic reporting on detected WAFs.</li>
    </ul>

    <h2>Installation</h2>
    <p>Follow these steps to install WAF Hunter:</p>
    <pre>
        <code>
git clone https://github.com/your_username/waf-hunter.git
        </code>
    </pre>

    <p>Then:</p>
    <ul>
        <li>Open Chrome and navigate to <code>chrome://extensions/</code>.</li>
        <li>Enable "Developer mode" in the top right corner.</li>
        <li>Click "Load unpacked" and select the <code>waf-hunter</code> folder.</li>
    </ul>

    <h2>Usage</h2>
    <p>How to use WAF Hunter:</p>
    <ul>
        <li>Browse to any website.</li>
        <li>If a WAF is detected, the extension icon will change and display information about the identified WAF.</li>
        <li>Click on the WAF Hunter icon in the toolbar for more details.</li>
    </ul>

    <h2>Contributions</h2>
    <p>If you'd like to contribute, feel free to fork the repository and submit a pull request with your improvements or fixes.</p>

    <h2>Roadmap</h2>
    <ul>
        <li>Support for more WAFs.</li>
        <li>Improved accuracy of detection.</li>
        <li>Detailed report export.</li>
        <li>Integration with other web analysis tools.</li>
    </ul>

    <h2>License</h2>
    <p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for more details.</p>

</body>
</html>
