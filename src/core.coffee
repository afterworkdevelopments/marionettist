import _ from "underscore"
import s from "underscore.string"
import $ from "jquery"
import Backbone from "backbone"
import backbone_radio from "backbone.radio"
import backboneAssociations from "backbone-associations"
import Marionette from "backbone.marionette"
import MarionetteToolkit from "marionette.toolkit"
import i18next from "i18next"
import numeral from "numeral"
import moment from "moment"
import momentRange from "moment-range"
import momentTimezone from "moment-timezone"




Marionettist = Marionette.extend()

Marionettist.Backbone = Backbone

Marionettist.Backbone.Radio = backbone_radio

Marionettist.Marionette = Marionette

Marionettist._ = _

Marionettist.$ = $

Marionettist.s = s

Marionettist.I18n = i18next

Marionettist.numeral = numeral

Marionettist.moment = moment

export default Marionettist
