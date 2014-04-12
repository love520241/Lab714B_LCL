/*
 * upclick(params)
 *
 *  parameters:
 *      element:        DOM object
 *      action:         Server script who receive file
 *      action_params:  Server script parameters. Array: key=value
 *      maxsize:        Maximum file size (in Bytes). 0 - unlimited
 *      dataname:       File data name. Default: Filedata
 *      zindex:         z-index listener
 *      onstart:        Callback function
 *                        onstart(filename).
 *                        Emited when file started upload
 *      oncomplete:      Callback function
 *                        oncomplete(server_response_data).
 *                        Emited when file successfully onloaded
 */
function upclick(params)
{
    // Parse params
    var defaults =
        {
            element: null,
            action: 'about:blank',
            action_params: {},
            maxsize: 0,
            onstart: null,
            oncomplete: null,
            dataname: 'Filedata',
            zindex: 'auto'
        };

    for(var key in defaults)
    {
        params[key] = params[key] ? params[key] : defaults[key];
    }


    var element = params['element'];
    if (typeof element == 'string')
        element = document.getElementById(element);

    var doc = element.ownerDocument;
    var input;

    // div
    var container = doc.createElement("div");

    // frame -> div
    var frame_name = 'frame' + new Date().getTime().toString().substr(8);

    // IE require such creation method
    container.innerHTML =
        '<iframe name="'+frame_name+'" src="about:blank" onload="this.onload_callback()"></iframe>';
    var frame = container.childNodes[0];

    // Callback for 'onload' event. Fired when form submited and data retrived
    frame.onload_callback =
        function()
        {
            // Phase 1. First 'onload' when element created
            // form -> div
            var form = doc.createElement('form');
            container.appendChild(form);
            form.method = 'post';
            form.enctype = 'multipart/form-data';
            form.encoding = 'multipart/form-data';
            form.target = frame_name; //tdemjen commented out, because we need the server's response
            form.setAttribute('target', frame_name); //tdemjen commented out, because we need the server's response
            form.action = params['action'];
            form.setAttribute('action', params['action']);
            form.style.margin = 0;
            form.style.padding = 0;
            form.style.height = '80px';
            form.style.width = '40px';

            // append params in form
            var action_params = params['action_params'];
            for(var key in action_params)
            {
                var hidden = doc.createElement("input");
                hidden.type = "hidden";
                hidden.name = key;
                hidden.value = String(action_params[key]);
                form.appendChild(hidden);
            }

            // MAX_FILESIZE. Maximum file size
            if (params['maxsize'])
            {
                var input_ms = doc.createElement('input');
                input_ms.type = 'hidden';
                input_ms.name = 'MAX_FILE_SIZE';
                input_ms.value = String(params['maxsize']);
                form.appendChild(input_ms);
            }

            // input -> form
            input = doc.createElement("input");
            input.name=params['dataname'];
            input.type='file';
            input.size='1';
input.runat='server'; //tdemjen added this line, otherwise ASP.NET doesn't return anything
            form.appendChild(input);

            // input style
            input.style.position = 'absolute';
            input.style.display = 'block';
            input.style.top = 0;
            input.style.left = 0;
            input.style.height = form.style.height;
            input.style.width = '80px';
            input.style.opacity = 0;
            input.style.filter = 'alpha(opacity=0)';
            input.style.fontSize = 8;
            input.style.zIndex = 1;
            input.style.visiblity = 'hidden';
            input.style.marginLeft = '-40px'; // hide IE text field

            // input click handler (enable container event listener)

            // 'change' event handler. Submit form
            var onchange_callback =
                function(e)
                {
                    // empty filename check
                    if (!input.value)
                        return;

                    // Run onstart callback. When upload started
                    var onstart = params['onstart'];
                    if (onstart)
                        onstart(input.value);

                    form.submit();
                };

            // bind 'change' callback
            // DOM2: FF, Opera, Chrome
            if (input.addEventListener)
                input.addEventListener ('change', onchange_callback, false);

            // IE 5+
            else if (input.attachEvent)
            {
                input.attachEvent(
                    'onpropertychange',
                    function(e)
                    {
                        // Get event details for IE
                        if (!e)
                            e = window.event;

                        if (e.propertyName == 'value')
                            onchange_callback();
                    }
                    );
            }
            // IE 4
            else
                input.onpropertychange = onchange_callback;


            // Phase 2. Next 'onload' when data received from server
            frame.onload_callback =
                function()
                {
                    var ifwin = null;

                    // Get frame window
                    // IE5.5+, Mozilla, NN7
                    if (frame.contentWindow)
                        ifwin = frame.contentWindow;
                    // NN6, Konqueror
                    else if (frame.contentDocument)
                        ifwin = frame.contentDocument.defaultView;

                    // Run 'oncomplete' callback
                    var data = ifwin.document.body.innerHTML;
                    var oncomplete = params['oncomplete'];
                    if (oncomplete)
                        oncomplete(data);

                    // Clear filename
                    form.reset();
                }

            // Get input container position helper
            input.findPos =
                function()
                {
                    var curleft = 0;
                    var curtop = 0;
                    var obj = element;

                    if (obj.offsetParent)
                    {
                        curleft = obj.offsetLeft;
                        curtop = obj.offsetTop;

                        while (obj = obj.offsetParent)
                        {
                            curleft += obj.offsetLeft;
                            curtop += obj.offsetTop;
                        }
                    }
                    return [curleft, curtop];
                }
        };

    // frame style
    frame.style.display = 'none';
    frame.width = 0;
    frame.height = 0;
    frame.marginHeight = 0;
    frame.marginWidth = 0;

    // container -> DOM
    doc.body.insertBefore(container, doc.body.firstChild);

    // container style
    container.style.position = 'absolute';
    container.style.overflow = 'hidden';
    container.style.padding = 0;
    container.style.margin = 0;
    container.style.visiblity = 'hidden';
    container.style.width = '0px';
    container.style.height = '0px';
    try { container.style.zIndex = params['zindex']; } catch(err) { }


    // If cursor out of element => shitch off listener
    var onmouseout_callback =
    function(e)
    {
        if (!e)
            e = window.event;

        container.style.width = '0px';
        container.style.height = '0px';
        var receiver = doc.elementFromPoint(e.clientX, e.clientY);

        if (receiver === element)
        {
            container.style.width = '40px';
            container.style.height = '80px';
        }
    }
    // DOM2: FF, Chrome, Opera
    if (container.addEventListener)
        container.addEventListener('mousemove', onmouseout_callback, false);
     // IE 5+
    else if (container.attachEvent)
        container.attachEvent("onmousemove", onmouseout_callback);


    // Move the input with the mouse to make sure it get clicked!
    var onmousemove_callback =
        function(e)
        {
            var coords = input.findPos();
            var x = coords[0];
            var y = coords[1];

            // Get event details for IE
            if (!e)
                e = window.event;

            if (e.pageX)
            {
                container.style.left = e.pageX - 20 + 'px';
                container.style.top = e.pageY - 40 + 'px';
            }
            else
            {
                container.style.left = e.offsetX + x - 20 + 'px';
                container.style.top = e.offsetY + y - 40 + 'px';
            }

            container.style.width = '40px';
            container.style.height = '80px';
        };

    // bind mousemove callback (for place button under cursor)
    // DOM2: FF, Chrome, Opera
    if (element.addEventListener)
        element.addEventListener('mousemove', onmousemove_callback, false);
     // IE 5+
    else if (element.attachEvent)
        element.attachEvent("onmousemove", onmousemove_callback);
}