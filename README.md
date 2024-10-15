<h1>WAF Hunter (Beta)</h1>
WAF Hunter is a beta Chrome extension designed to identify some of the most well-known Web Application Firewalls (WAFs) on web applications. It aims to assist security researchers, developers, and IT professionals in recognizing the presence of WAFs and simplifying web security analysis.

    <h2>Features</h2>
    <ul>
        <li>Identification of popular WAFs.</li>
        <li>Quick scan of visited websites.</li>
        <li>Visual indicator of WAF presence in the toolbar.</li>
        <li>Basic reporting on detected WAFs.</li>
    </ul>

<code>git clone https://github.com/yealvarez/Extensions.git</code>

Open Chrome and navigate to chrome://extensions/.

Enable "Developer mode" in the top right corner.

Click "Load unpacked" and select the waf-hunter folder that you just cloned.

Done! You should now see the WAF Hunter icon in your toolbar.

Usage
Browse to any website.
If a WAF is detected, the extension icon will change and display information about the identified WAF.
Click on the WAF Hunter icon in the toolbar for more details.
Contributions
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your improvements or fixes.

Roadmap
Support for more WAFs.
Improved accuracy of detection.
Detailed report export.
Integration with other web analysis tools.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

