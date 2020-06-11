export default function encode_data(port, data) {
    var ret = [];

if (port === 100) {
    check_encode("device_eui",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x00 ])
        }
    );
    check_encode("app_eui",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x01 ])
        }
    );
    check_encode("app_key",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x02 ])
        }
    );
    check_encode("device_address",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x03 ])
        }
    );
    check_encode("network_session_key",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x04 ])
        }
    );
    check_encode("app_session_key",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x05 ])
        }
    );
    check_encode("loramac_join_mode",
        function(value) {
            var converted = [0x10 | 0x80,
                ((value.loramac_otaa & 0x1) << 7),
                0x00 ];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x10 ])
        }
    );
    check_encode("loramac_opts",
        function(value) {
            var converted = [0x11 | 0x80,
                ((value.loramac_confirm_mode & 0x1) << 0) |
                ((value.loramac_networks & 0x1) << 2) |
                ((value.loramac_duty_cycle & 0x1) << 3) ];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x11 ])
        }
    );
    check_encode("loramac_dr_tx_power",
        function(value) {
            var converted = [0x12 | 0x80,
                ((value.loramac_adr & 0xf) << 0),
                ((value.loramac_dr_number & 0xf) << 0) ];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x12 ])
        }
    );
    check_encode("loramac_rx2",
        function(value) {
            var converted = [0x13 | 0x80,
                (value.loramac_tx_power >> 24) & 0xff,(value.loramac_tx_power >> 16) & 0xff, (value.loramac_tx_power >> 8) & 0xff, value.loramac_tx_power & 0xff,
                value.loramac_rx2_frequency & 0xff ];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x13 ])
        }
    );
    check_encode("loramac_rx2_dr",
        function(value) {
            var converted = [0x19 | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x19 ])
        }
    );
    check_encode("loramac_net_id_msb",
        function(value) {
            var converted = [0x1A | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x1A ])
        }
    );
    check_encode("loramac_net_id_lsb",
        function(value) {
            var converted = [0x20 | 0x80,
                (value >> 24) & 0xff,(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x20 ])
        }
    );
    check_encode("tick_seconds",
        function(value) {
            var converted = [0x21 | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x21 ])
        }
    );
    check_encode("tick_acceleration",
        function(value) {
            var converted = [0x26 | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x26 ])
        }
    );
    check_encode("tick_mcu_temperature",
        function(value) {
            var converted = [0x27 | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x27 ])
        }
    );
    check_encode("acceleration_impact_threshold",
        function(value) {
            var converted = [0x30 | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x30 ])
        }
    );
    check_encode("acceleration_impact_count_threshold",
        function(value) {
            var converted = [0x31 | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x31 ])
        }
    );
    check_encode("value_to_transmit",
        function(value) {
            var converted = [0x32 | 0x80,
                ((value.acceleration_report_alarm & 0x1) << 0) |
                ((value.acceleration_report_magnitude & 0x1) << 1) |
                ((value.acceleration_report_full_precision & 0x1) << 2) ];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x32 ])
        }
    );
    check_encode("acceleration_impact_grace_period",
        function(value) {
            var converted = [0x33 | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x33 ])
        }
    );
    check_encode("accel_modes",
        function(value) {
            var converted = [0x34 | 0x80,
                ((value.acceleration_impact_threshold_switch & 0x1) << 0) |
                ((value.accelerometer_enable & 0x1) << 7) ];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x34 ])
        }
    );
    check_encode("transducer_sample_rate_val",
        function(value) {
            var converted = [0x35 | 0x80,
                value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x35 ])
        }
    );
    check_encode("acceleration_impact_threshold_period",
        function(value) {
            var converted = [0x36 | 0x80,
                (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x36 ])
        }
    );
    check_encode("mcu_temperature_sample_period_idle",
        function(value) {
            var converted = [0x40 | 0x80,
                (value >> 24) & 0xff,(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x40 ])
        }
    );
    check_encode("mcu_temperature_sample_period_active",
        function(value) {
            var converted = [0x41 | 0x80,
                (value >> 24) & 0xff,(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x41 ])
        }
    );
    check_encode("mcu_temp_threshold",
        function(value) {
            var converted = [0x42 | 0x80,
                value.mcu_temperature_high_threshold & 0xff,
                value.mcu_temperature_low_threshold & 0xff ];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x42 ])
        }
    );
    check_encode("mcu_temp_threshold_enable",
        function(value) {
            var converted = [0x43 | 0x80,
                value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x43 ])
        }
    );
    check_encode("write_to_flash",
        function(value) {
            var converted = [0x70 | 0x80,
                ((value.app_configuration & 0x1) << 5) |
                ((value.lora_configuration & 0x1) << 6),
                ((value.restart_sensor & 0x1) << 0) ];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x70 ])
        }
    );
    check_encode("firmware_version",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x71 ])
        }
    );
    check_encode("firmware_version",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x71 ])
        }
    );
    check_encode("firmware_version",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x71 ])
        }
    );
    check_encode("firmware_version",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x71 ])
        }
    );
    check_encode("firmware_version",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x71 ])
        }
    );
    check_encode("firmware_version",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x71 ])
        }
    );
    check_encode("firmware_version",
        function(value) {
        },
        function() {
            ret = ret.concat(ret, [ 0x71 ])
        }
    );
    check_encode("configuration_factory_reset",
        function(value) {
            var converted = [0x72 | 0x80,
                value & 0xff];
            ret = ret.concat(converted);
        },
        function() {
            ret = ret.concat([ 0x72 ])
        }
    );
}

    function check_encode(prop_name, do_write, do_read)
    {
        if (data.hasOwnProperty(prop_name)) {
            var obj = data[prop_name];
            if (obj.hasOwnProperty("write")) {
                var value = obj.write;
                do_write(value);
            }

            if (obj.hasOwnProperty("read") && obj.read === true) {
                do_read();
            }
        }
    }
    return Base64Binary.decode(ret);
}


var Base64Binary = {
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /* will return a  Uint8Array type */
    decodeArrayBuffer: function(input) {
        const bytes = (input.length / 4) * 3;
        const ab = new ArrayBuffer(bytes);
        this.decode(input, ab);

        return ab;
    },

    removePaddingChars: function(input){
        const lkey = this._keyStr.indexOf(input[input.length - 1]);
        if(lkey === 64){
            return input.substring(0,input.length - 1);
        }
        return input;
    },

    decode: function (input, arrayBuffer) {
        //get last chars to see if are valid
        input = this.removePaddingChars(input);
        input = this.removePaddingChars(input);

        const bytes = parseInt((input.length / 4) * 3, 10);

        let uarray;
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        let j = 0;

        if (arrayBuffer)
            uarray = new Uint8Array(arrayBuffer);
        else
            uarray = new Uint8Array(bytes);

        //input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        for (i=0; i<bytes; i+=3) {
            //get the 3 octets in 4 ascii chars
            enc1 = this._keyStr.indexOf(input[j++]);
            enc2 = this._keyStr.indexOf(input[j++]);
            enc3 = this._keyStr.indexOf(input[j++]);
            enc4 = this._keyStr.indexOf(input[j++]);

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            uarray[i] = chr1;
            if (enc3 !== 64) uarray[i+1] = chr2;
            if (enc4 !== 64) uarray[i+2] = chr3;
        }

        return uarray;
    }
};
