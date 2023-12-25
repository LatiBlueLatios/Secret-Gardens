function test(module, _0x6281f) {
    function _0x54bf4d(_0x58157d) {
        return wasm.locateFile() ? wasm.locateFile(_0x58157d, _0x50ba4c) : _0x50ba4c + _0x58157d;
    }

    function _0x4bb6fb(inputStr, someClass, buffer) {
        for (var _0x294709 = someClass + buffer, _0x2a05fe = someClass; inputStr[_0x2a05fe] && !(_0x2a05fe >= _0x294709);) {
            ++_0x2a05fe;
        }
        if (_0x2a05fe - someClass > 16 && inputStr.buffer && _0x2c598b) {
            return _0x2c598b.decode(inputStr.subarray(someClass, _0x2a05fe));
        }
        for (var _0x428658 = ''; someClass < _0x2a05fe;) {
            var _0x11b597 = inputStr[someClass++];
            if (128 & _0x11b597) {
                var _0x101db6 = 63 & inputStr[someClass++];
                if (192 != (224 & _0x11b597)) {
                    var _0x2226aa = 63 & inputStr[someClass++];
                    if (_0x11b597 = 224 == (240 & _0x11b597) ? (15 & _0x11b597) << 12 | _0x101db6 << 6 | _0x2226aa : (7 & _0x11b597) << 18 | _0x101db6 << 12 | _0x2226aa << 6 | 63 & inputStr[someClass++], _0x11b597 < 65536) {
                        _0x428658 += String.fromCharCode(_0x11b597);
                    } else {
                        var _0x3ca5a3 = _0x11b597 - 65536;
                        _0x428658 += String.fromCharCode(55296 | _0x3ca5a3 >> 10, 56320 | 1023 & _0x3ca5a3);
                    }
                } else {
                    _0x428658 += String.fromCharCode((31 & _0x11b597) << 6 | _0x101db6);
                }
            } else {
                _0x428658 += String.fromCharCode(_0x11b597);
            }
        }
        return _0x428658;
    }

    function _0x5dfc4f(_0x49939a, _0x55df74) {
        return _0x49939a ? _0x4bb6fb(_0x5da6, _0x49939a, _0x55df74) : '';
    }

    function utf8encode(inputStr, someClass, buffer, param4) {
        if (!(param4 > 0)) {
            return 0;
        }
        for (var bufferStart = buffer, bufferEnd = buffer + param4 - 1, _0x1ed56c = 0; _0x1ed56c < inputStr.length; ++_0x1ed56c) {
            var charCode = inputStr.charCodeAt(_0x1ed56c);
            if (charCode >= 55296 && charCode <= 57343) {
                var _0xf53608 = inputStr.charCodeAt(++_0x1ed56c);
                charCode = 65536 + ((1023 & charCode) << 10) | 1023 & _0xf53608;
            }
            if (charCode <= 127) {
                if (buffer >= bufferEnd) {
                    break;
                }
                someClass[buffer++] = charCode;
            } else {
                if (charCode <= 2047) {
                    if (buffer + 1 >= bufferEnd) {
                        break;
                    }
                    someClass[buffer++] = 192 | charCode >> 6;
                    someClass[buffer++] = 128 | 63 & charCode;
                } else {
                    if (charCode <= 65535) {
                        if (buffer + 2 >= bufferEnd) {
                            break;
                        }
                        someClass[buffer++] = 224 | charCode >> 12;
                        someClass[buffer++] = 128 | charCode >> 6 & 63;
                        someClass[buffer++] = 128 | 63 & charCode;
                    } else {
                        if (buffer + 3 >= bufferEnd) {
                            break;
                        }
                        someClass[buffer++] = 240 | charCode >> 18;
                        someClass[buffer++] = 128 | charCode >> 12 & 63;
                        someClass[buffer++] = 128 | charCode >> 6 & 63;
                        someClass[buffer++] = 128 | 63 & charCode;
                    }
                }
            }
        }
        return someClass[buffer] = 0, buffer - bufferStart;
    }

    function _0x2fb6c4(_0xd4472, _0x10b7ed, _0x53d131) {
        return utf8encode(_0xd4472, _0x5da6, _0x10b7ed, _0x53d131);
    }

    function calculateUtf8ByteSize(inputString) {
        for (var byteSize = 0, _0x4a87b5 = 0; _0x4a87b5 < inputString.length; ++_0x4a87b5) {
            var _0x1f4935 = inputString.charCodeAt(_0x4a87b5);
            _0x1f4935 <= 127 ? byteSize++ : _0x1f4935 <= 2047 ? byteSize += 2 : _0x1f4935 >= 55296 && _0x1f4935 <= 57343 ? (byteSize += 4, ++_0x4a87b5) : byteSize += 3;
        }
        return byteSize;
    }

    function instantiateHeap(buffer) {
        bufferReference = buffer;
        wasm.HEAP8 = _0x2cba75 = new Int8Array(buffer);
        wasm.HEAP16 = _0x1a863c = new Int16Array(buffer);
        wasm.HEAP32 = _0x1355d5 = new Int32Array(buffer);
        wasm.HEAPU8 = _0x5da6 = new Uint8Array(buffer);
        wasm.HEAPU16 = _0x26222b = new Uint16Array(buffer);
        wasm.HEAPU32 = _0x381007 = new Uint32Array(buffer);
        wasm.HEAPF32 = _0x5ebf77 = new Float32Array(buffer);
        wasm.HEAPF64 = _0x33e294 = new Float64Array(buffer);
    }

    function _0x60d6a1() {
        return _0x43f713;
    }

    function _0x24bad3() {
        if (wasm.preRun) {
            for ('function' == typeof wasm.preRun && (wasm.preRun = [wasm.preRun]); wasm.preRun.length;) {
                _0x3bd919(wasm.preRun.shift());
            }
        }
        _0x75a32(_0x2efdcb);
    }

    function _0x3e87fb() {
        _0x81cba2 = true;
        _0x75a32(_0xe07fc6);
    }

    function _0x5c95c7() {
        _0x75a32(_0xb13ad2);
    }

    function _0x466de7() {
        if (wasm.postRun) {
            for ('function' == typeof wasm.postRun && (wasm.postRun = [wasm.postRun]); wasm.postRun.length;) {
                _0xfddb1c(wasm.postRun.shift());
            }
        }
        _0x75a32(_0x3dd5cc);
    }

    function _0x3bd919(_0x3fcdb8) {
        _0x2efdcb.unshift(_0x3fcdb8);
    }

    function _0x40c540(_0x2c8611) {
        _0xe07fc6.unshift(_0x2c8611);
    }

    function _0xfddb1c(_0x5ef989) {
        _0x3dd5cc.unshift(_0x5ef989);
    }

    function _0x91e81b(_0x34c836) {
        _0x21de80++;
        wasm.monitorRunDependencies && wasm.monitorRunDependencies(_0x21de80);
    }

    function _0x48be7d(_0x3f7ac8) {
        if (_0x21de80--, wasm.monitorRunDependencies && wasm.monitorRunDependencies(_0x21de80), 0 == _0x21de80 && (null !== _0x483fc3 && (clearInterval(_0x483fc3), _0x483fc3 = null), _0x131487)) {
            var _0x4d39aa = _0x131487;
            _0x131487 = null;
            _0x4d39aa();
        }
    }

    function _0x1c17ae(_0x394f0e) {
        wasm.onAbort && wasm.onAbort(_0x394f0e);
        _0x394f0e = 'Aborted(' + _0x394f0e + ')';
        _0xa5015b(_0x394f0e);
        _0x1e8452 = true;
        _0x19cb6b = 1;
        _0x394f0e += '. Build with -sASSERTIONS for more info.';
        var _0x4b62ee = new WebAssembly.RuntimeError(_0x394f0e);
        throw _0x4b62ee;
    }

    function _0xd2a05f(_0x457210) {
        return _0x457210.startsWith(_0x107c87);
    }

    function _0x139a53(_0xca679b) {
        try {
            if (_0xca679b == _0x4332a6 && _0x58faaa) {
                return new Uint8Array(_0x58faaa);
            }
            if (_0x438c94) {
                return _0x438c94(_0xca679b);
            }
            throw 'both async and sync fetching of the wasm failed';
        } catch (_0x47da89) {
            _0x1c17ae(_0x47da89);
        }
    }

    function _0x5a3a2f() {
        return _0x58faaa || !_0x227be3 && !_0x4ced55 || 'function' != typeof fetch ? Promise.resolve().then(function() {
            return _0x139a53(_0x4332a6);
        }) : fetch(_0x4332a6, {
            'credentials': 'same-origin'
        }).then(function(_0x2a0126) {
            if (!_0x2a0126.ok) {
                throw 'failed to load wasm binary file at \'' + _0x4332a6 + '\'';
            }
            return _0x2a0126.arrayBuffer();
        }).catch(function() {
            return _0x139a53(_0x4332a6);
        });
    }

    function _0x578dfd() {
        function _0x50220c(module, _0x176a26) {
            var moduleReference = module.exports;
            wasm.asm = moduleReference;
            memory = wasm.asm.g;
            instantiateHeap(memory.buffer);
            table = wasm.asm.k;
            _0x40c540(wasm.asm.h);
            _0x48be7d.wasm - instantiate;
        }

        function _0x3e9b0b(_0x1bb3b6) {
            _0x50220c(_0x1bb3b6.instance);
        }

        function _0x570df2() {
            return _0x58faaa || 'function' != typeof WebAssembly.instantiateStreaming || _0xd2a05f(_0x4332a6) || 'function' != typeof fetch ? _0x1b2192(_0x3e9b0b) : fetch(_0x4332a6, {
                'credentials': 'same-origin'
            }).then(function(_0x1ee011) {
                var _0x3f0c7d = WebAssembly.instantiateStreaming(_0x1ee011, _0x102b71);
                return _0x3f0c7d.then(_0x3e9b0b, function(e) {
                    return _0xa5015b('wasm streaming compile failed: ' + e), _0xa5015b('falling back to ArrayBuffer instantiation'), _0x1b2192(_0x3e9b0b);
                });
            });
        }
        var _0x102b71 = {
            'a': _0x2612f9
        };
        if (_0x91e81b('wasm-instantiate'), wasm.instantiateWasm) {
            try {
                var _0x584919 = wasm.instantiateWasm(_0x102b71, _0x50220c);
                return _0x584919;
            } catch (e) {
                return _0xa5015b('Module.instantiateWasm callback failed with error: ' + e), false;
            }
        }
        return _0x570df2(), {};
    }

    function _0x4ca965(_0x4f9483) {
        this.name = ExitStatus; // string or not ???
        this.message = 'Program terminated with exit(' + _0x4f9483 + ')';
        this.message = _0x4f9483;
    }

    function _0x75a32(_0xf3569b) {
        for (; _0xf3569b.length > 0;) {
            _0xf3569b.shift()(wasm);
        }
    }

    function _0x594700(_0x3ea880) {
        return _0x3ea880 instanceof _0x4ca965 || 'unwind' == _0x3ea880 ? _0x19cb6b : void _0x123b52(1, _0x3ea880);
    }

    function _0x27f4b4(_0x1559df, _0x1e064d) {
        _0x2cba75.set(_0x1559df, _0x1e064d);
    }

    function _0x400f50() {
        _0x1c17ae('');
    }

    function _0xf012a3(_0x763f30, _0x14e972, _0x28103f) {
        _0x5da6.copyWithin(_0x763f30, _0x14e972, _0x14e972 + _0x28103f);
    }

    function _0x44c3e5() {
        return performance.now();
    }

    function _0x359c0c() {
        return 2147483648;
    }

    function _0x5e46ea(_0x16da08) {
        try {
            return memory.grow(_0x16da08 - bufferReference.byteLength + 65535 >>> 16), instantiateHeap(memory.buffer), 1;
        } catch (_0x57519e) {}
    }

    function _0x174044(_0x42289a) {
        var _0x561c4b = _0x5da6.length;
        _0x42289a >>>= 0;
        var _0x17d6b0 = _0x359c0c();
        if (_0x42289a > _0x17d6b0) {
            return false;
        }
        for (var _0x312339 = function(_0x469934, _0x339454) {
                return _0x469934 + (_0x339454 - _0x469934 % _0x339454) % _0x339454;
            }, _0xe1147a = 1; _0xe1147a <= 4; _0xe1147a *= 2) {
            var _0x5bf1ee = _0x561c4b * (1 + 0.2 / _0xe1147a);
            _0x5bf1ee = Math.min(_0x5bf1ee, _0x42289a + 100663296);
            var _0x11c8f8 = Math.min(_0x17d6b0, _0x312339(Math.max(_0x42289a, _0x5bf1ee), 65536)),
                _0x59a97d = _0x5e46ea(_0x11c8f8);
            if (_0x59a97d) {
                return true;
            }
        }
        return false;
    }

    function _0x5d7af8(_0x4fbf36) {
        return 0 | eval(_0x5dfc4f(_0x4fbf36));
    }

    function _0x59e034(_0x53ce36) {
        ;
        if (null == _0x1a3341) {
            return 0;
        }
        _0x1a3341 += '';;
        return (!_0x2dd742.bufferSize || _0x2dd742.bufferSize < _0x391245 + 1) && (_0x2dd742.bufferSize && _0x5cd8be(_0x2dd742.buffer), _0x2dd742.bufferSize = _0x391245 + 1, _0x2dd742.buffer = _0x18629a(_0x2dd742.bufferSize)), _0x2fb6c4(_0x1a3341, _0x2dd742.buffer, _0x2dd742.bufferSize), _0x2dd742.buffer;
    }

    function _0x5357e1(_0x30f2f1) {
        _0x19cb6b = _0x30f2f1;
        _0x60d6a1() || (wasm.onExit && wasm.onExit(_0x30f2f1), _0x1e8452 = true);
        _0x123b52(_0x30f2f1, new _0x4ca965(_0x30f2f1));
    }

    function _0x58f4b5(_0x51edbd, _0x5c7914) {
        _0x19cb6b = _0x51edbd;
        _0x5357e1(_0x51edbd);
    }

    function _0x5bf960(_0x1c8550) {
        var _0x2dace7 = calculateUtf8ByteSize(_0x1c8550) + 1,
            _0x4df086 = _0x12fd15(_0x2dace7);
        return utf8encode(_0x1c8550, _0x2cba75, _0x4df086, _0x2dace7), _0x4df086;
    }

    function getFunctionbyName(_0x3c8be7) {
        var _0x142b2d = wasm['_' + _0x3c8be7];
        return _0x142b2d;
    }

    function executeFunction(input, returnType, paramType, customParams, _0x4edabb) {
        function wrapString(result) {
            return 'string' === returnType ? _0x5dfc4f(result) : 'boolean' === returnType ? Boolean(result) : result;
        }

        function processReturnValue(value) {
            return 0 !== nonZeroFlag && clearFlag(nonZeroFlag), wrapString(value);
        }
        var typeHandlers = {
                'string': function(stringValue) {
                    var resultPointer = 0;
                    if (null !== stringValue && undefined !== stringValue && stringValue !== 0) {
                        var size = (stringValue.length << 2) + 1;
                        resultPointer = allocateMemory(size);
                        writeToMemory(stringValue, resultPointer, size);
                    }
                    return resultPointer;
                },
                'array': function(arrayValue) {
                    var arrayPointer = allocateMemory(arrayValue.length);
                    writeArrayToMemory(arrayValue, arrayPointer);
                    return arrayPointer;
                }
            },
            targetFunction = getFunctionbyName(input),
            processedParams = [],
            nonZeroFlag = 0;
        if (customParams) {
            for (var i = 0; i < customParams.length; i++) {
                var currentHandler = typeHandlers[paramType[i]];
                currentHandler ? (0 === nonZeroFlag && (nonZeroFlag = setFlag()), processedParams[i] = currentHandler(customParams[i])) : processedParams[i] = customParams[i];
            }
        }
        var finalResult = targetFunction.apply(null, processedParams);
        return finalResult = processReturnValue(finalResult);
    }

    function _0x1ba331(_0x52c502, _0x46f51b, _0x7089e3, _0x4dc5aa) {
        _0x7089e3 = _0x7089e3 || [];
        var _0x5d5db4 = _0x7089e3.every(function(_0x4e3d9c) {
                return 'number' === _0x4e3d9c || 'boolean' === _0x4e3d9c;
            }),
            _0x1fd0a4 = 'string' !== _0x46f51b;
        return _0x1fd0a4 && _0x5d5db4 && !_0x4dc5aa ? getFunctionbyName(_0x52c502) : function() {
            return executeFunction(_0x52c502, _0x46f51b, _0x7089e3, arguments, _0x4dc5aa);
        };
    }

    function _0x2d510b(_0xc622ab) {
        var _0x57b511 = wasm._main;
        _0xc622ab = _0xc622ab || [];
        _0xc622ab.unshift(_0x36d527);
        var _0x2d6f35 = _0xc622ab.length,
            _0x1ec8c1 = _0x12fd15(4 * (_0x2d6f35 + 1)),
            _0x41e074 = _0x1ec8c1 >> 2;
        _0xc622ab.forEach(function(_0x34b502) {
            _0x1355d5[_0x41e074++] = _0x5bf960(_0x34b502);
        });
        _0x1355d5[_0x41e074] = 0;
        try {
            var _0x5971f0 = _0x57b511(_0x2d6f35, _0x1ec8c1);
            return _0x58f4b5(_0x5971f0, true), _0x5971f0;
        } catch (_0xe3724d) {
            return _0x594700(_0xe3724d);
        }
    }

    function _0x43dcba(_0x29186a) {
        function _0x167c8d() {
            _0x524007 || (_0x524007 = true, wasm.calledRun = true, _0x1e8452 || (_0x3e87fb(), _0x5c95c7(), wasm.onRuntimeInitialized && wasm.onRuntimeInitialized(), _0xeb634a && _0x2d510b(_0x29186a), _0x466de7()));
        }
        _0x29186a = _0x29186a || _0x3778ba;
        _0x21de80 > 0 || (_0x24bad3(), _0x21de80 > 0 || (wasm.setStatus ? (wasm.setStatus('Running...'), setTimeout(function() {
            setTimeout(function() {
                wasm.setStatus('');
            }, 1);
            _0x167c8d();
        }, 1)) : _0x167c8d()));
    };
    (_0x227be3 || _0x4ced55) && (_0x4ced55 ? _0x50ba4c = self.location.href : undefined != typeof document && document.currentScript && (_0x50ba4c = document.currentScript.src), _0x50ba4c = 0 !== _0x50ba4c.indexOf('blob:') ? _0x50ba4c.substr(0, _0x50ba4c.replace(/[?#].*/, '').lastIndexOf('/') + 1) : '', _0x5cbf6f = function(_0x36b2d1) {
        var _0x14ef27 = new XMLHttpRequest();
        return _0x14ef27.open('GET', _0x36b2d1, false), _0x14ef27.send(null), _0x14ef27.responseText;
    }, _0x4ced55 && (_0x438c94 = function(_0x1bc037) {
        var _0x52a5b4 = _0x15a834,
            _0x278c09 = new XMLHttpRequest();
        return _0x278c09.open('GET', _0x1bc037, false), _0x278c09.responseType = _0x52a5b4(3313), _0x278c09.send(null), new Uint8Array(_0x278c09.response);
    }), _0x3e14c4 = function(_0x2905ff, _0x1a5a48, _0x19e6aa) {
        var _0x4c4a61 = new XMLHttpRequest();
        _0x4c4a61.open('GET', _0x2905ff, true);
        _0x4c4a61.responseType = arraybuffer;
        _0x4c4a61.onload = function() {
            return 200 == _0x4c4a61.status || 0 == _0x4c4a61.status && _0x4c4a61.response ? void _0x1a5a48(_0x4c4a61) : void _0x19e6aa();
        };
        _0x4c4a61.onerror = _0x19e6aa;
        _0x4c4a61.send(null);
    }, _0x5107f0 = function(_0x1d29b5) {
        return document.title = _0x1d29b5;
    });;
    Object.assign(wasm, _0x5659ac);
    _0x5659ac = null;
    wasm.arguments && (_0x3778ba = wasm.arguments);
    wasm.thisProgram && (_0x36d527 = wasm.thisProgram);
    wasm.quit && (_0x123b52 = wasm.quit);;
    wasm.wasmBinary && (_0x58faaa = wasm.wasmBinary);;
    object != (undefined == typeof WebAssembly ? undefined : _0x3192c4(WebAssembly)) && _0x1c17ae('no native wasm support detected');;
    _0x4332a6 = 'zombs_wasm.wasm';
    _0xd2a05f(_0x4332a6) || (_0x4332a6 = _0x54bf4d(_0x4332a6));;
    wasm.ccall = executeFunction;
    wasm.cwrap = _0x1ba331;;
    if (_0x131487 = function _0x488919() {
            _0x524007 || _0x43dcba();
            _0x524007 || (_0x131487 = _0x488919);
        }, wasm.preInit) {
        for ('function' == typeof wasm.preInit && (wasm.preInit = [wasm.preInit]); wasm.preInit.length > 0;) {
            wasm.preInit.pop()();
        }
    };
    wasm.noInitialRun && (_0xeb634a = false);
    _0x43dcba();
    module.exports = wasm;
}