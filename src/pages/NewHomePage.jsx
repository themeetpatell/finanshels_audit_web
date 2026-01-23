import { useEffect, useRef } from 'react';
import { FiCheckCircle, FiStar, FiFileText, FiShield, FiUsers, FiZap, FiBarChart2, FiBriefcase, FiCreditCard, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './NewHomePage.css';

const NewHomePage = () => {
  const testimonialsTrackRef = useRef(null);

  // Zoho advanced lead UTM capture (provided snippet)
  useEffect(() => {
    if (window.zfutmInitialized) return;
    window.zfutmInitialized = true;

    function ZFAdvLead() {}
    ZFAdvLead.utmPValObj = ZFAdvLead.utmPValObj || {};
    ZFAdvLead.utmPNameArr = new Array('utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content');
    ZFAdvLead.utmcustPNameArr = new Array();
    ZFAdvLead.isSameDomain = false;

    ZFAdvLead.prototype.zfautm_sC = function(paramName, path, domain, secure) {
      var value = ZFAdvLead.utmPValObj[paramName];
      if (typeof value !== 'undefined' && value !== null) {
        var cookieStr = paramName + '=' + encodeURIComponent(value);
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 7);
        cookieStr += '; expires=' + exdate.toGMTString();
        cookieStr += '; path=/';
        if (domain) {
          cookieStr += '; domain=' + encodeURIComponent(domain);
        }
        if (secure) {
          cookieStr += '; secure';
        }
        document.cookie = cookieStr;
      }
    };
    ZFAdvLead.prototype.zfautm_ini = function() {
      this.zfautm_bscPCap();
      var url_search = document.location.search;
      for (var i = 0; i < ZFAdvLead.utmcustPNameArr.length; i++) {
        var zf_pN = ZFAdvLead.utmcustPNameArr[i];
        var zf_pV;
        if (zf_pN == 'referrername') {
          zf_pV = (document.URL || '').slice(0, 1500);
        } else {
          zf_pV = this.zfautm_gP(url_search, zf_pN);
          if (zf_pV == undefined || zf_pV == '') {
            zf_pV = this.zfautm_gC(zf_pN);
          }
        }
        if (typeof zf_pV !== 'undefined' && zf_pV !== null & zf_pV != '') {
          ZFAdvLead.utmPValObj[zf_pN] = zf_pV;
        }
      }
      for (var pkey in ZFAdvLead.utmPValObj) {
        this.zfautm_sC(pkey);
      }
    };
    ZFAdvLead.prototype.zfautm_bscPCap = function() {
      var trafSrc = this.zfautm_calcTrafSrc();
      if (trafSrc.source != '') {
        ZFAdvLead.utmPValObj.utm_source = trafSrc.source;
      }
      if (trafSrc.medium != '') {
        ZFAdvLead.utmPValObj.utm_medium = trafSrc.medium;
      }
      if (trafSrc.campaign != '') {
        ZFAdvLead.utmPValObj.utm_campaign = trafSrc.campaign;
      }
      if (trafSrc.term != '') {
        ZFAdvLead.utmPValObj.utm_term = trafSrc.term;
      }
      if (trafSrc.content != '') {
        ZFAdvLead.utmPValObj.utm_content = trafSrc.content;
      }
    };
    ZFAdvLead.prototype.zfautm_calcTrafSrc = function() {
      var u1 = '', u2 = '', u3 = '', u4 = '', u5 = '';
      var search_engines = [['bing', 'q'], ['google', 'q'], ['yahoo', 'q'], ['baidu', 'q'], ['yandex', 'q'], ['ask', 'q']];
      var ref = document.referrer;
      ref = ref.substr(ref.indexOf('//') + 2);
      var ref_domain = ref;
      var ref_path = '/';
      var ref_search = '';

      var url_search = document.location.search;
      if (url_search.indexOf('utm_source') > -1 || url_search.indexOf('utm_medium') > -1 || url_search.indexOf('utm_campaign') > -1 || url_search.indexOf('utm_term') > -1 || url_search.indexOf('utm_content') > -1) {
        u1 = this.zfautm_gP(url_search, 'utm_source');
        u2 = this.zfautm_gP(url_search, 'utm_medium');
        u3 = this.zfautm_gP(url_search, 'utm_campaign');
        u4 = this.zfautm_gP(url_search, 'utm_term');
        u5 = this.zfautm_gP(url_search, 'utm_content');
      } else if (this.zfautm_gP(url_search, 'gclid')) {
        u1 = 'Google Ads';
        u2 = 'cpc';
        u3 = '(not set)';
        if (!ZFAdvLead.utmcustPNameArr.includes('gclid')) {
          ZFAdvLead.utmcustPNameArr.push('gclid');
        }
      } else if (ref) {
        var r_u1 = this.zfautm_gC('utm_source');
        var r_u2 = this.zfautm_gC('utm_medium');
        var r_u3 = this.zfautm_gC('utm_campaign');
        var r_u4 = this.zfautm_gC('utm_term');
        var r_u5 = this.zfautm_gC('utm_content');
        if (typeof r_u1 === 'undefined' && typeof r_u2 === 'undefined' && typeof r_u3 === 'undefined' && typeof r_u4 === 'undefined' && typeof r_u5 === 'undefined') {
          if (ref.indexOf('/') > -1) {
            ref_domain = ref.substr(0, ref.indexOf('/'));
            ref_path = ref.substr(ref.indexOf('/'));
            if (ref_path.indexOf('?') > -1) {
              ref_search = ref_path.substr(ref_path.indexOf('?'));
              ref_path = ref_path.substr(0, ref_path.indexOf('?'));
            }
          }
          u2 = 'referral';
          u1 = ref_domain;
          for (var i = 0; i < search_engines.length; i++) {
            if (ref_domain.indexOf(search_engines[i][0]) > -1) {
              u2 = 'organic';
              u1 = search_engines[i][0];
              u4 = this.zfautm_gP(ref_search, search_engines[i][1]) || '(not provided)';
              break;
            }
          }
        } else {
          if (typeof r_u1 !== 'undefined') {
            u1 = r_u1;
          }
          if (typeof r_u2 !== 'undefined') {
            u2 = r_u2;
          }
          if (typeof r_u3 !== 'undefined') {
            u3 = r_u3;
          }
          if (typeof r_u4 !== 'undefined') {
            u4 = r_u4;
          }
          if (typeof r_u5 !== 'undefined') {
            u5 = r_u5;
          }
        }
      } else {
        var r2_u1 = this.zfautm_gC('utm_source');
        var r2_u2 = this.zfautm_gC('utm_medium');
        var r2_u3 = this.zfautm_gC('utm_campaign');
        var r2_u4 = this.zfautm_gC('utm_term');
        var r2_u5 = this.zfautm_gC('utm_content');
        if (typeof r2_u1 === 'undefined' && typeof r2_u2 === 'undefined' && typeof r2_u3 === 'undefined' && typeof r2_u4 === 'undefined' && typeof r2_u5 === 'undefined') {
          var locRef = document.URL;
          locRef = locRef.substr(locRef.indexOf('//') + 2);
          if (locRef.indexOf('/') > -1) {
            locRef = locRef.substr(0, locRef.indexOf('/'));
          }
          u1 = locRef;
          u2 = 'referral';
        } else {
          if (typeof r2_u1 !== 'undefined') {
            u1 = r2_u1;
          }
          if (typeof r2_u2 !== 'undefined') {
            u2 = r2_u2;
          }
          if (typeof r2_u3 !== 'undefined') {
            u3 = r2_u3;
          }
          if (typeof r2_u4 !== 'undefined') {
            u4 = r2_u4;
          }
          if (typeof r2_u5 !== 'undefined') {
            u5 = r2_u5;
          }
        }
      }
      return {
        source: u1,
        medium: u2,
        campaign: u3,
        term: u4,
        content: u5
      };
    };
    ZFAdvLead.prototype.zfautm_gP = function(s, q) {
      try {
        var match = s.match('[?&]' + q + '=([^&]+)');
        if (match) {
          if (match[1].length > 199) {
            var raw = decodeURIComponent(match[1]);
            raw = raw.replace(/[^A-Za-z0-9_]/g, '');
            return raw.slice(0, 199);
          } else {
            return decodeURIComponent(match[1]);
          }
        } else {
          return '';
        }
      } catch (e) {
        return '';
      }
    };
    ZFAdvLead.prototype.zfautm_gC = function(cookieName) {
      var cookieArr = document.cookie.split('; ');
      for (var i = 0; i < cookieArr.length; i++) {
        var cookieVals = cookieArr[i].split('=');
        if (cookieVals[0] === cookieName && cookieVals[1]) {
          return decodeURIComponent(cookieVals[1]);
        }
      }
    };
    ZFAdvLead.prototype.zfautm_gC_enc = function(cookieName) {
      var cookieArr = document.cookie.split('; ');
      for (var i = 0; i < cookieArr.length; i++) {
        var cookieVals = cookieArr[i].split('=');
        if (cookieVals[0] === cookieName && cookieVals[1]) {
          return cookieVals[1];
        }
      }
    };
    ZFAdvLead.prototype.zfautm_iframeSprt = function() {
      var zf_frame = document.getElementsByTagName('iframe');
      for (var i = 0; i < zf_frame.length; ++i) {
        if ((zf_frame[i].src).indexOf('formperma') > 0) {
          var zf_src = zf_frame[i].src;
          for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
            var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
            utmPm = (ZFAdvLead.isSameDomain && (ZFAdvLead.utmcustPNameArr.indexOf(utmPm) == -1)) ? 'zf_' + utmPm : utmPm;
            var utmPmregex = new RegExp('[?&]' + utmPm + '=');
            if (!utmPmregex.test(zf_src)) {
              var utmVal = this.zfautm_gC_enc(ZFAdvLead.utmPNameArr[prmIdx]);
              if (typeof utmVal !== 'undefined') {
                if (utmVal != '') {
                  if (zf_src.indexOf('?') > 0) {
                    zf_src = zf_src + '&' + utmPm + '=' + utmVal;
                  } else {
                    zf_src = zf_src + '?' + utmPm + '=' + utmVal;
                  }
                }
              }
            }
          }
          if (zf_frame[i].src.length < zf_src.length) {
            zf_frame[i].src = zf_src;
          }
        }
      }
    };
    ZFAdvLead.prototype.zfautm_DHtmlSprt = function() {
      var zf_formsArr = document.forms;
      for (var frmInd = 0; frmInd < zf_formsArr.length; frmInd++) {
        var zf_form_act = zf_formsArr[frmInd].action;
        if (zf_form_act && zf_form_act.indexOf('formperma') > 0) {
          for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
            var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
            var utmVal = this.zfautm_gC(ZFAdvLead.utmPNameArr[prmIdx]);
            if (typeof utmVal !== 'undefined') {
              if (utmVal != '') {
                var fieldObj = zf_formsArr[frmInd][utmPm];
                if (fieldObj) {
                  fieldObj.value = utmVal;
                }
              }
            }
          }
        }
      }
    };
    ZFAdvLead.prototype.zfautm_jsEmbedSprt = function(id) {
      document.getElementById('zforms_iframe_id').removeAttribute('onload');
      var jsEmbdFrm = document.getElementById('zforms_iframe_id');
      var embdSrc = jsEmbdFrm.src;
      for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
        var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
        utmPm = (ZFAdvLead.isSameDomain && (ZFAdvLead.utmcustPNameArr.indexOf(utmPm) == -1)) ? 'zf_' + utmPm : utmPm;
        var utmVal = this.zfautm_gC_enc(ZFAdvLead.utmPNameArr[prmIdx]);
        if (typeof utmVal !== 'undefined') {
          if (utmVal != '') {
            if (embdSrc.indexOf('?') > 0) {
              embdSrc = embdSrc + '&' + utmPm + '=' + utmVal;
            } else {
              embdSrc = embdSrc + '?' + utmPm + '=' + utmVal;
            }
          }
        }
      }
      jsEmbdFrm.src = embdSrc;
    };

    var zfutm_zfAdvLead = new ZFAdvLead();
    zfutm_zfAdvLead.zfautm_ini();
    if (document.readyState === 'complete') {
      zfutm_zfAdvLead.zfautm_iframeSprt();
      zfutm_zfAdvLead.zfautm_DHtmlSprt();
    } else {
      window.addEventListener('load', function() {
        zfutm_zfAdvLead.zfautm_iframeSprt();
        zfutm_zfAdvLead.zfautm_DHtmlSprt();
      }, false);
    }

    window.zfutm_zfAdvLead = zfutm_zfAdvLead;
  }, []);

  // Push consultation_form_ec for thank-you conversion
  useEffect(() => {
    const formIds = ['form', 'cta-zoho-form'];
    const handler = (event) => {
      const formEl = event.target;
      const emailValue = formEl.querySelector('input[name=\"Email\"]')?.value?.trim() || '';
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'consultation_form_ec',
          enhanced_conversion_data: { email: emailValue }
        });
      }
    };

    const attached = formIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    attached.forEach((form) => form.addEventListener('submit', handler));

    return () => {
      attached.forEach((form) => form.removeEventListener('submit', handler));
    };
  }, []);

  const clientLogos = [
    { src: '/clients/Binary.png', alt: 'Binary' },
    { src: '/clients/actualize.png', alt: 'Actualize' },
    { src: '/clients/carbonsirf.png', alt: 'Carbonsirf' },
    { src: '/clients/cotu.avif', alt: 'Cotu' },
    { src: '/clients/fuze.png', alt: 'Fuze' },
    { src: '/clients/growdash.png', alt: 'Growdash' },
    { src: '/clients/humlog.png', alt: 'Humlog' },
    { src: '/clients/veehive.png', alt: 'Veehive' },
    { src: '/clients/zywa.png', alt: 'Zywa' }
  ];

  const countryCodes = [
    { country: "Afghanistan", code: "+93" },
    { country: "Aland Islands", code: "+358" },
    { country: "Albania", code: "+355" },
    { country: "Algeria", code: "+213" },
    { country: "American Samoa", code: "+1" },
    { country: "Andorra", code: "+376" },
    { country: "Angola", code: "+244" },
    { country: "Anguilla", code: "+1" },
    { country: "Antigua and Barbuda", code: "+1" },
    { country: "Argentina", code: "+54" },
    { country: "Armenia", code: "+374" },
    { country: "Aruba", code: "+297" },
    { country: "Ascension Island", code: "+247" },
    { country: "Australia", code: "+61" },
    { country: "Austria", code: "+43" },
    { country: "Azerbaijan", code: "+994" },
    { country: "Bahamas", code: "+1" },
    { country: "Bahrain", code: "+973" },
    { country: "Bangladesh", code: "+880" },
    { country: "Barbados", code: "+1" },
    { country: "Belarus", code: "+375" },
    { country: "Belgium", code: "+32" },
    { country: "Belize", code: "+501" },
    { country: "Benin", code: "+229" },
    { country: "Bermuda", code: "+1" },
    { country: "Bhutan", code: "+975" },
    { country: "Bolivia, Plurinational State of", code: "+591" },
    { country: "Bonaire, Sint Eustatius and Saba", code: "+599" },
    { country: "Bosnia and Herzegovina", code: "+387" },
    { country: "Botswana", code: "+267" },
    { country: "Brazil", code: "+55" },
    { country: "British Indian Ocean Territory", code: "+246" },
    { country: "Brunei Darussalam", code: "+673" },
    { country: "Bulgaria", code: "+359" },
    { country: "Burkina Faso", code: "+226" },
    { country: "Burundi", code: "+257" },
    { country: "Cabo Verde", code: "+238" },
    { country: "Cambodia", code: "+855" },
    { country: "Cameroon", code: "+237" },
    { country: "Canada", code: "+1" },
    { country: "Cayman Islands", code: "+1" },
    { country: "Central African Republic", code: "+236" },
    { country: "Chad", code: "+235" },
    { country: "Chile", code: "+56" },
    { country: "China", code: "+86" },
    { country: "Christmas Island", code: "+61" },
    { country: "Cocos (Keeling) Islands", code: "+61" },
    { country: "Colombia", code: "+57" },
    { country: "Comoros", code: "+269" },
    { country: "Congo", code: "+242" },
    { country: "Congo, The Democratic Republic of the", code: "+243" },
    { country: "Cook Islands", code: "+682" },
    { country: "Costa Rica", code: "+506" },
    { country: "Cote d'Ivoire", code: "+225" },
    { country: "Croatia", code: "+385" },
    { country: "Cuba", code: "+53" },
    { country: "Curacao", code: "+599" },
    { country: "Cyprus", code: "+357" },
    { country: "Czechia", code: "+420" },
    { country: "Denmark", code: "+45" },
    { country: "Djibouti", code: "+253" },
    { country: "Dominica", code: "+1" },
    { country: "Dominican Republic", code: "+1" },
    { country: "Ecuador", code: "+593" },
    { country: "Egypt", code: "+20" },
    { country: "El Salvador", code: "+503" },
    { country: "Equatorial Guinea", code: "+240" },
    { country: "Eritrea", code: "+291" },
    { country: "Estonia", code: "+372" },
    { country: "Eswatini", code: "+268" },
    { country: "Ethiopia", code: "+251" },
    { country: "Falkland Islands (Malvinas)", code: "+500" },
    { country: "Faroe Islands", code: "+298" },
    { country: "Fiji", code: "+679" },
    { country: "Finland", code: "+358" },
    { country: "France", code: "+33" },
    { country: "French Guiana", code: "+594" },
    { country: "French Polynesia", code: "+689" },
    { country: "Gabon", code: "+241" },
    { country: "Gambia", code: "+220" },
    { country: "Georgia", code: "+995" },
    { country: "Germany", code: "+49" },
    { country: "Ghana", code: "+233" },
    { country: "Gibraltar", code: "+350" },
    { country: "Greece", code: "+30" },
    { country: "Greenland", code: "+299" },
    { country: "Grenada", code: "+1" },
    { country: "Guadeloupe", code: "+590" },
    { country: "Guam", code: "+1" },
    { country: "Guatemala", code: "+502" },
    { country: "Guernsey", code: "+44" },
    { country: "Guinea", code: "+224" },
    { country: "Guinea-Bissau", code: "+245" },
    { country: "Guyana", code: "+592" },
    { country: "Haiti", code: "+509" },
    { country: "Holy See (Vatican City State)", code: "+39" },
    { country: "Honduras", code: "+504" },
    { country: "Hong Kong", code: "+852" },
    { country: "Hungary", code: "+36" },
    { country: "Iceland", code: "+354" },
    { country: "India", code: "+91" },
    { country: "Indonesia", code: "+62" },
    { country: "Iran, Islamic Republic of", code: "+98" },
    { country: "Iraq", code: "+964" },
    { country: "Ireland", code: "+353" },
    { country: "Isle of Man", code: "+44" },
    { country: "Israel", code: "+972" },
    { country: "Italy", code: "+39" },
    { country: "Jamaica", code: "+1" },
    { country: "Japan", code: "+81" },
    { country: "Jersey", code: "+44" },
    { country: "Jordan", code: "+962" },
    { country: "Kazakhstan", code: "+7" },
    { country: "Kenya", code: "+254" },
    { country: "Kiribati", code: "+686" },
    { country: "Korea, Democratic People's Republic of", code: "+850" },
    { country: "Korea, Republic of", code: "+82" },
    { country: "Kosovo", code: "+383" },
    { country: "Kuwait", code: "+965" },
    { country: "Kyrgyzstan", code: "+996" },
    { country: "Lao People's Democratic Republic", code: "+856" },
    { country: "Latvia", code: "+371" },
    { country: "Lebanon", code: "+961" },
    { country: "Lesotho", code: "+266" },
    { country: "Liberia", code: "+231" },
    { country: "Libya", code: "+218" },
    { country: "Liechtenstein", code: "+423" },
    { country: "Lithuania", code: "+370" },
    { country: "Luxembourg", code: "+352" },
    { country: "Macao", code: "+853" },
    { country: "Madagascar", code: "+261" },
    { country: "Malawi", code: "+265" },
    { country: "Malaysia", code: "+60" },
    { country: "Maldives", code: "+960" },
    { country: "Mali", code: "+223" },
    { country: "Malta", code: "+356" },
    { country: "Marshall Islands", code: "+692" },
    { country: "Martinique", code: "+596" },
    { country: "Mauritania", code: "+222" },
    { country: "Mauritius", code: "+230" },
    { country: "Mayotte", code: "+262" },
    { country: "Mexico", code: "+52" },
    { country: "Micronesia, Federated States of", code: "+691" },
    { country: "Moldova, Republic of", code: "+373" },
    { country: "Monaco", code: "+377" },
    { country: "Mongolia", code: "+976" },
    { country: "Montenegro", code: "+382" },
    { country: "Montserrat", code: "+1" },
    { country: "Morocco", code: "+212" },
    { country: "Mozambique", code: "+258" },
    { country: "Myanmar", code: "+95" },
    { country: "Namibia", code: "+264" },
    { country: "Nauru", code: "+674" },
    { country: "Nepal", code: "+977" },
    { country: "Netherlands", code: "+31" },
    { country: "New Caledonia", code: "+687" },
    { country: "New Zealand", code: "+64" },
    { country: "Nicaragua", code: "+505" },
    { country: "Niger", code: "+227" },
    { country: "Nigeria", code: "+234" },
    { country: "Niue", code: "+683" },
    { country: "Norfolk Island", code: "+672" },
    { country: "North Macedonia", code: "+389" },
    { country: "Northern Mariana Islands", code: "+1" },
    { country: "Norway", code: "+47" },
    { country: "Oman", code: "+968" },
    { country: "Pakistan", code: "+92" },
    { country: "Palau", code: "+680" },
    { country: "Palestine, State of", code: "+970" },
    { country: "Panama", code: "+507" },
    { country: "Papua New Guinea", code: "+675" },
    { country: "Paraguay", code: "+595" },
    { country: "Peru", code: "+51" },
    { country: "Philippines", code: "+63" },
    { country: "Poland", code: "+48" },
    { country: "Portugal", code: "+351" },
    { country: "Puerto Rico", code: "+1" },
    { country: "Qatar", code: "+974" },
    { country: "Reunion", code: "+262" },
    { country: "Romania", code: "+40" },
    { country: "Russian Federation", code: "+7" },
    { country: "Rwanda", code: "+250" },
    { country: "Saint Barthelemy", code: "+590" },
    { country: "Saint Helena, Ascension and Tristan da Cunha", code: "+290" },
    { country: "Saint Kitts and Nevis", code: "+1" },
    { country: "Saint Lucia", code: "+1" },
    { country: "Saint Martin (French part)", code: "+590" },
    { country: "Saint Pierre and Miquelon", code: "+508" },
    { country: "Saint Vincent and the Grenadines", code: "+1" },
    { country: "Samoa", code: "+685" },
    { country: "San Marino", code: "+378" },
    { country: "Sao Tome and Principe", code: "+239" },
    { country: "Saudi Arabia", code: "+966" },
    { country: "Senegal", code: "+221" },
    { country: "Serbia", code: "+381" },
    { country: "Seychelles", code: "+248" },
    { country: "Sierra Leone", code: "+232" },
    { country: "Singapore", code: "+65" },
    { country: "Sint Maarten (Dutch part)", code: "+1" },
    { country: "Slovakia", code: "+421" },
    { country: "Slovenia", code: "+386" },
    { country: "Solomon Islands", code: "+677" },
    { country: "Somalia", code: "+252" },
    { country: "South Africa", code: "+27" },
    { country: "South Sudan", code: "+211" },
    { country: "Spain", code: "+34" },
    { country: "Sri Lanka", code: "+94" },
    { country: "Sudan", code: "+249" },
    { country: "Suriname", code: "+597" },
    { country: "Svalbard and Jan Mayen", code: "+47" },
    { country: "Sweden", code: "+46" },
    { country: "Switzerland", code: "+41" },
    { country: "Syrian Arab Republic", code: "+963" },
    { country: "Taiwan, Province of China", code: "+886" },
    { country: "Tajikistan", code: "+992" },
    { country: "Tanzania, United Republic of", code: "+255" },
    { country: "Thailand", code: "+66" },
    { country: "Timor-Leste", code: "+670" },
    { country: "Togo", code: "+228" },
    { country: "Tokelau", code: "+690" },
    { country: "Tonga", code: "+676" },
    { country: "Trinidad and Tobago", code: "+1" },
    { country: "Tristan da Cunha", code: "+290" },
    { country: "Tunisia", code: "+216" },
    { country: "Turkiye", code: "+90" },
    { country: "Turkmenistan", code: "+993" },
    { country: "Turks and Caicos Islands", code: "+1" },
    { country: "Tuvalu", code: "+688" },
    { country: "Uganda", code: "+256" },
    { country: "Ukraine", code: "+380" },
    { country: "United Arab Emirates", code: "+971" },
    { country: "United Kingdom", code: "+44" },
    { country: "United States", code: "+1" },
    { country: "Uruguay", code: "+598" },
    { country: "Uzbekistan", code: "+998" },
    { country: "Vanuatu", code: "+678" },
    { country: "Venezuela, Bolivarian Republic of", code: "+58" },
    { country: "Viet Nam", code: "+84" },
    { country: "Virgin Islands, British", code: "+1" },
    { country: "Virgin Islands, U.S.", code: "+1" },
    { country: "Wallis and Futuna", code: "+681" },
    { country: "Western Sahara", code: "+212" },
    { country: "Yemen", code: "+967" },
    { country: "Zambia", code: "+260" },
    { country: "Zimbabwe", code: "+263" }
  ];

  const pushWhatsAppGtmClick = (href) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'gtm.linkClick',
        'Click URL': href,
        'gtm.elementUrl': href,
        _triggers: '193123837_46' // matches GTM WA trigger regex
      });
    }
  };

  const auditNecessityPoints = [
    {
      icon: <FiFileText />,
      title: 'License Renewal Compliance',
      description:
        'Whether you operate in mainland or free zones, submitting audited financial statements within specified deadlines is mandatory for trade license renewal.'
    },
    {
      icon: <FiShield />,
      title: 'Federal Tax Authority (FTA) Compliance',
      description:
        'Companies with revenues exceeding certain thresholds or those selected for FTA audit must comply through credible, independently audited accounts that withstand regulatory scrutiny.'
    },
    {
      icon: <FiCreditCard />,
      title: 'Banking Relationships in UAE',
      description:
        'Without current audited statements, your access to banking services and credit may be restricted, limiting your ability to take on projects, manage cash flow, or expand operations.'
    },
    {
      icon: <FiUsers />,
      title: 'Credibility and Trust',
      description:
        'Third-party validation significantly enhances your organization’s reputation in the competitive UAE market allowing you to raise funding from investors.'
    }
  ];

  const auditServices = [
    {
      icon: <FiShield />,
      title: 'Statutory Financial Audits',
      description:
        'We deliver clear audit opinions that meet all UAE legal and regulatory requirements including those for DED license renewal, free zone compliance, and FTA submissions.'
    },
    {
      icon: <FiBarChart2 />,
      title: 'Internal Audit Services',
      description:
        'We assess operational efficiency, compliance with policies and procedures, safeguarding of assets, and reliability of financial and operational information. We identify control weaknesses and recommend practical improvements that strengthen your organization’s internal environment.'
    },
    {
      icon: <FiBriefcase />,
      title: 'Free Zone Compliance Audits',
      description:
        'We provide specialized audit services tailored to the specific requirements of major UAE free zones. Each free zone has unique audit submission requirements, deadlines, and reporting formats. Our team ensures your audited financials meet the exact specifications required by your free zone authority for seamless license renewal and ongoing compliance.'
    },
    {
      icon: <FiZap />,
      title: 'Tax Audits and FTA Support',
      description:
        'We review VAT returns, corporate tax filings, transfer pricing documentation, and tax provision calculations in line with UAE tax legislation. We provide expert representation, manage all communications with the FTA, prepare comprehensive responses to queries, and negotiate resolutions that protect your interests while ensuring compliance with UAE tax laws.'
    }
  ];

  const whyChooseReasons = [
    {
      icon: <FiShield />,
      title: 'UAE Regulatory Expertise',
      description:
        'Our audit teams possess in-depth knowledge of UAE Commercial Companies Law, Federal Tax Authority regulations, free zone requirements across all major zones (JAFZA, DMCC, DIFC, ADGM), and emirate-specific licensing regulations. This specialized UAE knowledge ensures your audit meets exact regulatory specifications without delays or rejections.'
    },
    {
      icon: <FiUsers />,
      title: 'Experienced Professional Team',
      description:
        'Our auditors hold internationally recognized certifications including CPA, CA, ACCA, SOCPA, and CMA designations, with many team members holding UAE Ministry of Economy audit approval. With decades of combined experience conducting audits for UAE businesses across mainland and free zones, we bring technical excellence and practical wisdom specific to the UAE business environment.'
    },
    {
      icon: <FiZap />,
      title: 'Technology-Enabled Efficiency',
      description:
        'We leverage advanced audit software, data analytics tools, and automated testing procedures that enhance audit quality while reducing turnaround times. Our technology platform provides secure client portals for document sharing, real-time progress tracking, and seamless communication throughout the audit process.'
    },
    {
      icon: <FiBriefcase />,
      title: 'Flexible Engagement Models',
      description:
        'Whether you need one-time statutory audits, ongoing internal audit support, or specialized forensic investigations, we structure engagements to match your specific needs. Our scalable approach accommodates businesses of all sizes, from startups to large enterprises.'
    },
    {
      icon: <FiCheckCircle />,
      title: 'Comprehensive Support Beyond Audit',
      description:
        'Our relationships with clients extend beyond issuing audit reports. We provide ongoing advisory support, assist with implementation of recommendations, offer training on internal controls and compliance matters, and serve as a resource for financial and operational questions throughout the year.'
    },
    {
      icon: <FiStar />,
      title: 'Proven Track Record',
      description:
        'Our portfolio includes successful audits for hundreds of organizations across multiple jurisdictions. Client testimonials, long-standing relationships,and industry recognition reflect our consistent delivery of high-quality audit services that exceed expectations.'
    }
  ];

  const testimonials = [
    {
      quote:
        'Fast, friendly, and very professional. I love how communicative they were handling our Corporate tax registration.',
      name: 'Abdulla Al-Ogail',
      role: 'Co-founder & CEO, Olymon',
      avatar: '/Founders/abdulla.jpeg'
    },
    {
      quote:
        'Always very responsive, supportive, having a business mindset, providing visuals and on top of all that, open for feedback so they can keep improving. Very happy that I took the decision to work with them.',
      name: 'Szilvia Vitos',
      role: 'Founder, Livvity',
      avatar: '/Founders/szilvia.jpeg'
    },
    {
      quote:
        'They designed an accounting system tailor made to our needs & completely automated our finance operations just like they promised. They\'ve been super helpful for us to scale.',
      name: 'Jeremy Khatar',
      role: 'CEO, Ronin Global LLC, USA',
      avatar: '/Founders/jeremy.png'
    },
    {
      quote:
        'If you ever do any financial modeling/forecasting, I seriously can\'t recommend Finanshels enough. they are a dependable team of professionals who work hard to deliver results.',
      name: 'Bader Al Kazimi',
      role: 'Founder, Optimize App',
      avatar: '/Founders/bader.jpeg'
    },
    {
      quote:
        'I am extremely grateful for the exceptional service we received from Finanshels.com. We insurancehub.ae highly recommend their services to anyone seeking reliable and trustworthy Accounting Partner.',
      name: 'Jomon Ulahannan',
      role: 'Founder & CEO, INSURANCE HUB',
      avatar: '/Founders/jomon.jpg'
    },
    {
      quote: 'Super fast team and I can always depend on these guys...way to go',
      name: 'Pravin Rai',
      role: 'Founder & CEO, QuicKart',
      avatar: '/Founders/pravin.jpeg'
    },
    {
      quote:
        'Bookkeeping, a piece of cake with Finanshels! Sahal has been extremely helpful in managing the books! He makes sure its up-to-date and super clean! Sometimes, for advice, I refer to him as well and again, he has been super supportive and helpful to my needs!',
      name: 'Sapna Mulani',
      role: 'Sr Accountant, Growdash',
      avatar: '/Founders/sapna.jpg'
    },
    {
      quote:
        'They thoroughly understood our business processes and streamlined our accounting processes perfectly where our both in-house and outsourced accountants failed multiple times to streamline and structure our complex financial ops.',
      name: 'Meet Patel',
      role: 'Former COO, StudentHub & BAWES',
      avatar: '/Founders/themeetpatel.png'
    },
    {
      quote:
        'Excellent service. Finanshels has made the tax registration process fast and easy. Their communication is super prompt and clear. 5 stars!!',
      name: 'Tina Chugani',
      role: 'Managing Director, Proxis LLC',
      avatar: '/Founders/tina.jpeg'
    },
    {
      quote: 'The team was super responsive and the entire service was efficiently processed.',
      name: 'Usama Naeem',
      role: 'Co-founder, Qureos',
      avatar: '/Founders/usama.jpeg'
    }
  ];

  const scrollTestimonials = (direction) => {
    const container = testimonialsTrackRef.current;
    if (!container) return;

    const card = container.querySelector('.testimonial-card');
    const scrollAmount = card ? card.getBoundingClientRect().width + 24 : container.clientWidth;

    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="new-homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <div className="trust-badge">
              <span className="trust-dot" aria-hidden="true" />
              <span className="trust-text">Trusted audit partners for 5,000+ UAE businesses</span>
            </div>
            
            <h1 className="hero-title">
              Looking for Trusted Auditing Services<br />
              and Audit Firms in UAE?<br />
              Say Hello to <span className="highlight-green">Finanshels</span>
            </h1>
            
            <p className="hero-description">
              With a dedicated team of experts trained on the nuances of UAE laws and regulations,
              Finanshels supports small businesses with audit ready books and FTA representation.
            </p>
            
            <div className="hero-features">
              <div className="hero-feature">
                <FiCheckCircle className="feature-icon" />
                <div>
                  <strong>Top-Rated Audit Services in Dubai, Sharjah, Abu Dhabi</strong>
                </div>
              </div>
              <div className="hero-feature">
                <FiCheckCircle className="feature-icon" />
                <div>
                  <strong>Certified Registered Auditors in the UAE</strong>
                </div>
              </div>
              <div className="hero-feature">
                <FiCheckCircle className="feature-icon" />
                <div>
                  <strong>Leading Auditing Firm Serving 5000+ SMEs</strong>
                </div>
              </div>
            </div>
            
            <div className="hero-ctas">
              <a href="#consultation" className="btn-primary">Book Your Audit Consultation</a>
              <a href="#services" className="btn-secondary">Explore Audit Services</a>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="final-consultation-form hero-consultation-form">
              <form
                action="https://forms.zohopublic.com/finanshelsllc/form/GetYourFreeAccountingConsultation/formperma/QCbszPbiYZx16ed2dttj_d614SUen1t8U5iXQVgng7U/htmlRecords/submit"
                name="form"
                id="form"
                method="POST"
                acceptCharset="UTF-8"
                encType="multipart/form-data"
                onSubmit={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: 'form_submission',
                      form_name: 'hero_consultation_form',
                      form_location: 'hero_section',
                      form_type: 'accounting_consultation'
                    });
                  }
                  if (window.gtag) {
                    window.gtag('event', 'conversion', {
                      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL'
                    });
                  }
                }}
              >
                <input type="hidden" name="zf_referrer_name" value="" />
                <input type="hidden" name="zf_redirect_url" value="" />
                <input type="hidden" name="zc_gad" value="" />
                <input type="hidden" name="utm_source" value="" />
                <input type="hidden" name="utm_medium" value="" />
                <input type="hidden" name="utm_campaign" value="" />
                <input type="hidden" name="utm_term" value="" />
                <input type="hidden" name="utm_content" value="" />

                <h3 className="form-title">Get Your Free Audit Consultation</h3>
                <p className="form-subtitle">Book a 30-minute call with our audit experts. No obligation.</p>

                <div className="form-row">
                  <div className="form-field">
                    <label>First Name</label>
                    <input
                      type="text"
                      maxLength="255"
                      name="Name_First"
                      fieldType="7"
                      placeholder="First name"
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label>Last Name</label>
                    <input
                      type="text"
                      maxLength="255"
                      name="Name_Last"
                      fieldType="7"
                      placeholder="Last name"
                      className="form-input"
                    />
                  </div>
                </div>

                <label>
                  Email <em>*</em>
                </label>
                <input
                  type="text"
                  maxLength="255"
                  name="Email"
                  defaultValue=""
                  fieldType="9"
                  placeholder="i.e. name@yourdomain.com"
                  className="form-input"
                />

                <label>
                  Phone <em>*</em>
                </label>
                <input
                  type="text"
                  compname="PhoneNumber"
                  name="PhoneNumber_countrycode"
                  phoneFormat="1"
                  isCountryCodeEnabled="false"
                  maxLength="20"
                  defaultValue=""
                  fieldType="11"
                  id="international_PhoneNumber_countrycode"
                  placeholder="+971 00 000 0000"
                  className="form-input"
                />

                <label>
                  Company Name <em>*</em>
                </label>
                <input
                  type="text"
                  name="SingleLine1"
                  defaultValue=""
                  fieldType="1"
                  maxLength="255"
                  placeholder="i.e. dropxcell LLC"
                  className="form-input"
                />

                <label>Job Title</label>
                <input
                  type="text"
                  name="SingleLine2"
                  defaultValue=""
                  fieldType="1"
                  maxLength="255"
                  placeholder="e.g. Finance Manager"
                  className="form-input"
                />

                <button type="submit" className="form-submit">
                  <em>Submit</em>
                </button>
              </form>

              <p className="form-disclaimer">
                By submitting, you agree to receive communications from Finanshels. Your data is secure and will never be shared.
              </p>

              <div className="form-badges">
                <div className="badge-item">
                  <FiCheckCircle className="badge-icon" />
                  <span>Pay Only if Satisfied</span>
                </div>
                <div className="badge-item">
                  <FiCheckCircle className="badge-icon" />
                  <span>No Commitment</span>
                </div>
                <div className="badge-item">
                  <FiCheckCircle className="badge-icon" />
                  <span>24h Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-trust-row">
          <p className="trust-label">Trusted by leading UAE businesses</p>
          <div className="logo-list-wide">
            {clientLogos.map((logo) => (
              <div key={logo.alt} className="trust-logo">
                <img
                  src={logo.src}
                  alt={`${logo.alt} logo`}
                  className="trust-logo-image"
                  loading="lazy"
                  decoding="async"
                  height="28"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-value">5,000+</div>
            <div className="stat-label">Businesses Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4.9</div>
            <div className="stat-label">Trustpilot Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">10×</div>
            <div className="stat-label">Faster Than Manual</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Dedicated Support</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="content-container">
          <div className="section-header">
            <p className="section-eyebrow">AUDIT READINESS</p>
            <h2 className="section-title">
              Why is <span className="highlight-green">Audit</span> Necessary?
            </h2>
            <p className="section-subtitle">
              As your business grows, so do the compliance requirements. Failure to keep up with FTA audits can
              lead to penalties and tarnish your business reputation.
            </p>
          </div>
          
          <div className="problem-grid">
            {auditNecessityPoints.map((problem, index) => (
              <div key={index} className="problem-card">
                <div className="problem-icon">{problem.icon}</div>
                <h3 className="problem-title">{problem.title}</h3>
                <p className="problem-description">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section" id="services">
        <div className="content-container-large">
          <div className="solution-content">
            <div className="solution-left">
              <p className="section-eyebrow">AUDIT SERVICES</p>
              <h2 className="section-title">
                Stop Stressing About <span className="highlight-green">Audits.</span>
              </h2>
              <p className="solution-description">
                Your dedicated team of experts at Finanshels do all the heavy lifting preparing your books for audits.
                Our services cover.
              </p>
              
              <div className="solution-features">
                {auditServices.map((feature, index) => (
                  <div key={index} className="solution-feature">
                    <div className="solution-icon">{feature.icon}</div>
                    <div className="solution-text">
                      <h4 className="solution-feature-title">{feature.title}</h4>
                      <p className="solution-feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <a
                className="btn-primary data-wa-track"
                href="https://api.whatsapp.com/send/?phone=971521549572&text=Hi+I+saw+your+ad+for+Audit+Services+on+google.+I%E2%80%99d+like+to+get+started.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: 'whatsapp_click',
                      button_location: 'solution_section',
                      button_text: 'Talk to an Audit Expert',
                      phone_number: '971521549572'
                    });
                  }
                  pushWhatsAppGtmClick('https://api.whatsapp.com/send/?phone=971521549572');
                }}
              >
                Talk to an Audit Expert
              </a>
            </div>
            
            <div className="solution-right">
              <div className="audit-report-mock">
                <div className="report-header">
                  <div className="report-brand">Finanshels Audit</div>
                  <div className="report-status">Mock Audit Report • FY 2024</div>
                </div>

                <div className="report-summary">
                  <div>
                    <p className="summary-label">Audit Opinion</p>
                    <p className="summary-value success">Unqualified</p>
                  </div>
                  <div>
                    <p className="summary-label">Prepared For</p>
                    <p className="summary-value">UAE SME • Free Zone</p>
                  </div>
                </div>

                <div className="report-metrics">
                  <div className="report-metric">
                    <span className="metric-label">Revenue</span>
                    <span className="metric-value">AED 12.4M</span>
                  </div>
                  <div className="report-metric">
                    <span className="metric-label">EBITDA</span>
                    <span className="metric-value">AED 3.1M</span>
                  </div>
                  <div className="report-metric">
                    <span className="metric-label">Cash & Bank</span>
                    <span className="metric-value">AED 4.8M</span>
                  </div>
                </div>

                <div className="report-body">
                  <div className="report-highlight">
                    <span className="highlight-dot" />
                    <div>
                      <p className="highlight-title">FTA-Ready Financials</p>
                      <p className="highlight-desc">Prepared to UAE standards with full supporting schedules.</p>
                    </div>
                  </div>
                  <div className="report-highlight">
                    <span className="highlight-dot" />
                    <div>
                      <p className="highlight-title">License Renewal Pack</p>
                      <p className="highlight-desc">Signed audit report, notes, and management letter.</p>
                    </div>
                  </div>
                  <div className="report-highlight">
                    <span className="highlight-dot" />
                    <div>
                      <p className="highlight-title">Bank-Ready Statements</p>
                      <p className="highlight-desc">Clean, compliant statements for credit and financing.</p>
                    </div>
                  </div>
                </div>

                <div className="report-footer">
                  Mock audit report preview — swap with final visual from design.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose Section */}
      <section className="why-choose-section" id="why-finanshels">
        <div className="content-container">
          <div className="section-header">
            <p className="section-eyebrow">WHY BUSINESS OWNERS CHOOSE FINANSHELS</p>
            <h2 className="section-title">
              Ready to Strengthen Your Financial Integrity?
            </h2>
            <p className="section-subtitle">
              Contact us today to discuss how our professional audit services can provide the assurance, insights, and credibility your organization needs to thrive.
            </p>
          </div>

          <div className="reason-grid">
            {whyChooseReasons.map((reason, index) => (
              <div key={index} className="reason-card">
                <div className="reason-icon">{reason.icon}</div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - CTO Redesign */}
      <section className="testimonials-section" id="reviews">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="testimonials-label">CLIENT SUCCESS STORIES</span>
            <h2 className="testimonials-heading">
              Trusted by <span className="text-accent">5,000+ Businesses</span>
            </h2>
            <p className="testimonials-description">
              Don't just take our word for it. Here's what our clients say about working with Finanshels.
            </p>
          </div>
          
          <div className="testimonials-carousel">
            <button
              className="carousel-control carousel-control-prev"
              onClick={() => scrollTestimonials(-1)}
              aria-label="Previous testimonials"
            >
              <FiChevronLeft />
            </button>

            <div className="carousel-viewport" ref={testimonialsTrackRef}>
              <div className="carousel-track">
                {testimonials.map((testimonial, index) => (
                  <article key={index} className="testimonial">
                    <div className="testimonial-header">
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className="rating-star" />
                        ))}
                      </div>
                    </div>
                    
                    <blockquote className="testimonial-content">
                      <p>{testimonial.quote}</p>
                    </blockquote>
                    
                    <footer className="testimonial-author">
                      <div className="author-image">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            loading="lazy"
                            decoding="async"
                            width="60"
                            height="60"
                          />
                        ) : (
                          <div className="author-initials">
                            {testimonial.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                          </div>
                        )}
                      </div>
                      <div className="author-info">
                        <cite className="author-name">{testimonial.name}</cite>
                        <p className="author-role">{testimonial.role}</p>
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            </div>

            <button
              className="carousel-control carousel-control-next"
              onClick={() => scrollTestimonials(1)}
              aria-label="Next testimonials"
            >
              <FiChevronRight />
            </button>
          </div>

          <div className="trustpilot-widget">
            <div className="trustpilot-content">
              <div className="trustpilot-stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="trustpilot-star" />
                ))}
              </div>
              <div className="trustpilot-text">
                <strong>4.9/5</strong> on Trustpilot Reviews
              </div>
              <div className="trustpilot-count">239 reviews</div>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="final-cta-section" id="consultation">
        <div className="final-cta-container">
          <div className="final-cta-left">
            <p className="section-eyebrow">GET STARTED TODAY</p>
            <h2 className="cta-title">
              Ready to Stop Stressing<br />
              About Audits?
            </h2>
            <p className="cta-description">
              Join 5,000+ UAE businesses who trust Finanshels with their accounting and audit requirements.
              Set up a free consultation with our experts today!
            </p>
            
            <div className="cta-steps">
              <div className="cta-step">
                <div className="step-number">1</div>
                <span>Book your free consultation</span>
              </div>
              <div className="cta-step">
                <div className="step-number">2</div>
                <span>Get a customized audit assessment</span>
              </div>
              <div className="cta-step">
                <div className="step-number">3</div>
                <span>Get your questions answered by an expert</span>
              </div>
            </div>
          </div>
          
          <div className="final-cta-right">
            <div className="final-consultation-form">
            <form
              action="https://forms.zohopublic.com/finanshelsllc/form/GetYourFreeAccountingConsultation/formperma/QCbszPbiYZx16ed2dttj_d614SUen1t8U5iXQVgng7U/htmlRecords/submit"
                name="form"
                id="cta-zoho-form"
                method="POST"
                acceptCharset="UTF-8"
                encType="multipart/form-data"
                onSubmit={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: 'form_submission',
                      form_name: 'cta_consultation_form',
                      form_location: 'final_cta_section',
                      form_type: 'accounting_consultation'
                    });
                  }
                  if (window.gtag) {
                    window.gtag('event', 'conversion', {
                      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL'
                    });
                  }
                }}
              >
                <input type="hidden" name="zf_referrer_name" value="" />
                <input type="hidden" name="zf_redirect_url" value="" />
                <input type="hidden" name="zc_gad" value="" />
                <input type="hidden" name="utm_source" value="" />
                <input type="hidden" name="utm_medium" value="" />
                <input type="hidden" name="utm_campaign" value="" />
                <input type="hidden" name="utm_term" value="" />
                <input type="hidden" name="utm_content" value="" />

                <h3 className="form-title">Get Your Free Audit Consultation</h3>
                <p className="form-subtitle">Book a 30-minute call with our audit experts. No obligation.</p>

                <div className="form-row">
                  <div className="form-field">
                    <label>First Name</label>
                    <input
                      type="text"
                      maxLength="255"
                      name="Name_First"
                      fieldType="7"
                      placeholder="First name"
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label>Last Name</label>
                    <input
                      type="text"
                      maxLength="255"
                      name="Name_Last"
                      fieldType="7"
                      placeholder="Last name"
                      className="form-input"
                    />
                  </div>
                </div>

                <label>
                  Email <em>*</em>
                </label>
                <input
                  type="text"
                  maxLength="255"
                  name="Email"
                  defaultValue=""
                  fieldType="9"
                  placeholder="i.e. name@yourdomain.com"
                  className="form-input"
                />

                <label>
                  Phone <em>*</em>
                </label>
                <input
                  type="text"
                  compname="PhoneNumber"
                  name="PhoneNumber_countrycode"
                  phoneFormat="1"
                  isCountryCodeEnabled="false"
                  maxLength="20"
                  defaultValue=""
                  fieldType="11"
                  id="international_PhoneNumber_countrycode_cta"
                  placeholder="+971 00 000 0000"
                  className="form-input"
                />

                <label>
                  Company Name <em>*</em>
                </label>
                <input
                  type="text"
                  name="SingleLine1"
                  defaultValue=""
                  fieldType="1"
                  maxLength="255"
                  placeholder="i.e. dropxcell LLC"
                  className="form-input"
                />

                <label>Job Title</label>
                <input
                  type="text"
                  name="SingleLine2"
                  defaultValue=""
                  fieldType="1"
                  maxLength="255"
                  placeholder="e.g. Finance Manager"
                  className="form-input"
                />
                <button type="submit" className="form-submit">
                  <em>Submit</em>
                </button>
              </form>
              
              <p className="form-disclaimer">
                By submitting, you agree to receive communications from Finanshels. Your data is secure and will never be shared.
              </p>
              
              <div className="form-badges">
                <div className="badge-item">
                  <FiCheckCircle className="badge-icon" />
                  <span>Pay Only if Satisfied</span>
                </div>
                <div className="badge-item">
                  <FiCheckCircle className="badge-icon" />
                  <span>No Commitment</span>
                </div>
                <div className="badge-item">
                  <FiCheckCircle className="badge-icon" />
                  <span>24h Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewHomePage;
