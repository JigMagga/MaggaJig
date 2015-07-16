module.exports = {
    init: function (jig) {
        this.jig = jig;
    },
    render: function (data) {
        var template = this.jig.defaults.view.template,
            elementName = this.jig.defaults.view.element,
            html = template(data),
            element = document.querySelector(elementName);

        if (element === null) {
            element = document.createElement('div');
            element.className = elementName.slice(1);
            document.body.appendChild(element);
        }
        document.querySelector(elementName).innerHTML = html;
    }
};
