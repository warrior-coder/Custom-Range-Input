
class Range {
    constructor(object) {
        // OBJECT:
        this.el = object.el;
        document.querySelector(this.el).innerHTML =
            `<div class="CustomRangeInput">
                <div class="CustomRangeInput_band">
                    <div class="CustomRangeInput_band_fill"></div>
                </div>
                <div class="CustomRangeInput_button">
                    <span class="CustomRangeInput_button_text"></span>
                </div>
            </div>`;
        this.minValue = (object.minValue == undefined) ? 0 : object.minValue;
        this.maxValue = (object.maxValue == undefined) ? 100 : object.maxValue;
        this.active = false;
        this.mX = -1;
        this.w0 = document.querySelector(this.el).offsetWidth;

        // BUTTON:
        if (object.buttonColor != undefined)
        {
            document.querySelector(this.el + ' .CustomRangeInput_button').style.background = object.buttonColor;
            document.querySelector(this.el + ' .CustomRangeInput_button').style.boxShadow = '0px 0px 4px ' + object.buttonColor;
        }

        if (object.buttonWidth != undefined)
        {
            document.querySelector(this.el + ' .CustomRangeInput_button').style.width = object.buttonWidth + 'px';
        }
        this.b0 = document.querySelector(this.el + ' .CustomRangeInput_button').offsetWidth/2;

        // VALUE:
        if (object.value != undefined)
        {
            if (object.value > this.maxValue) this.value = this.maxValue;
            else if (object.value < this.minValue) this.value = this.minValue;
            else this.value = object.value;
            document.querySelector(this.el + ' .CustomRangeInput_button').style.left = Math.round( (this.value-this.minValue) / (this.maxValue-this.minValue)  * (this.w0 - 2*this.b0)) + 'px';
        }
        else
        {
            this.value = 0;
        }

        if (document.querySelector(this.el + '-text'))
        {
            document.querySelector(this.el + '-text').innerText = this.value;
        }
        
        if (object.hideValue)
        {
            document.querySelector(this.el + ' .CustomRangeInput_button_text').style.display = 'none';
        }
        else
        {
            document.querySelector(this.el + ' .CustomRangeInput_button_text').innerText = this.value;
        }

        if (object.valueColor != undefined)
        {
            document.querySelector(this.el + ' .CustomRangeInput_button_text').style.color = object.valueColor;
        }

        // BAND:
        if (object.bandColor != undefined)
        {
            document.querySelector(this.el + ' .CustomRangeInput_band').style.background = object.bandColor;
        }
        if (object.fill != undefined)
        {
            document.querySelector(this.el + ' .CustomRangeInput_band_fill').style.background = object.fill;
            document.querySelector(this.el + ' .CustomRangeInput_band_fill').style.width = Math.round( (this.value-this.minValue) / (this.maxValue-this.minValue) * this.w0) + 'px';
        }
        else
        {
            document.querySelector(this.el + ' .CustomRangeInput_band_fill').style.display = 'none';
        } 
        if (object.bandHeight != undefined)
        {
            document.querySelector(this.el + ' .CustomRangeInput_band').style.height = object.bandHeight + 'px';
        }

        // EVENTS:
        document.querySelector(this.el).addEventListener('mousedown', e => {
            this.active = true;
            this.mX = e.pageX - document.querySelector(this.el).offsetLeft;
            this.w0 = document.querySelector(this.el).offsetWidth;
            this.b0 = document.querySelector(this.el + ' .CustomRangeInput_button').offsetWidth/2;
            this.SetPosition(this.mX);
        });
    
        document.addEventListener('mouseup', () => {
            if (this.active) this.active = false;
        });

        document.addEventListener('mousemove', e => {
            if (this.active)
            {
                this.SetPosition(this.mX);
                this.mX = e.pageX - document.querySelector(this.el).offsetLeft;
            }
        });
    }

    // POSITION CANGE:
    SetPosition(left)
    {
        if (left < this.b0) left = this.b0;
        else if (left > this.w0-this.b0) left = this.w0-this.b0;
        left -= this.b0;
        document.querySelector(this.el + ' .CustomRangeInput_button').style.left = left + 'px';
        document.querySelector(this.el + ' .CustomRangeInput_band_fill').style.width = left + 'px';
        this.value = Math.ceil(left / (this.w0 - 2*this.b0) * (this.maxValue-this.minValue) + this.minValue);
        document.querySelector(this.el + ' .CustomRangeInput_button_text').innerText = this.value;
        if (document.querySelector(this.el + '-text')) document.querySelector(this.el + '-text').innerText = this.value;
    }
}

// ADD STYLES
document.head.innerHTML += `
    <style>
        .CustomRangeInput {
            height: inherit;
            width: inherit;
            position: relative;
            user-select: none;
            display: flex;
            align-items: center;
        }
        .CustomRangeInput_band {
            position: absolute;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.25);
        }
        .CustomRangeInput_band_fill {
            position: absolute;
            height: 100%;
            width: 30%;
            background: #FFFF00;
        }
        .CustomRangeInput_button  {
            position: relative;
            width: 10px;
            left: 0;
            height: 100%;
            background: #FFFF00;
            box-shadow: 0px 0px 4px #FFFF00;
            cursor: pointer;
            display: flex;
            justify-content: center;
        }
        .CustomRangeInput_button_text {
            position: absolute;
            color: rgba(255, 255, 255, 0.5);
            top: 110%;
        }
    </style>`;