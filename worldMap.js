var localization = {
    en: {
        title: "World Map",
        navigation: "World Map",
        region: "Variable with country names:",
        value: "Variable with values to map:",
        colors: "Enter number of colors",
        zoomByStates: "Enter the countries to zoom into, for e.g. united states of america, canada, mexico",
        specify_a_title: "Enter a title",
        legend: "Legend:",
        help: {
            title: "World Map",
            r_help: "help(country_choropleth, package='choroplethr')",
            body: `
            <b>Description</b></br>
            Draws a world map and allows you to optionally zoom into 1 or more countries
             <br/>
             <b>Usage</b>
             <br/>
             <code> 
            country_choropleth(BSkyDfForMap, title="", legend="", num_colors =1,zoom=NULL)
             </code> <br/>
             <b>Arguments</b><br/>
             <ul>
             <li>
             BSkyDfForMap: A data.frame with a column named "region" and a column named "value". Elements in the "region" column must exactly match how regions are named in the "region" column in ?country.map. Run code below under the other section to see the variables in country.map
             </li>
             <li>
             Title: An optional title for the map.
             </li>
             <li>
             Legend: An optional name for the legend.
             </li>
             <li>
             num_colors: The number of colors on the map. A value of 1 will use a continuous scale. A value in [2, 9] will use that many colors.
             </li>
             <li>
             zoom: An optional vector of countries to zoom in on. Elements of this vector must exactly match the names of countries as they appear in the "region" column of ?country.regions
             </li>
             </ul>
             <b>Package</b></br>
             choroplethr;choroplethrMaps;</br>
             <b>Help</b></br>
             help(country_choropleth, package='choroplethr')</br>
             <b>Other</b></br>
             <code> 
             # Run the code below to access the state.map dataset<br/>
             library(choroplethr)<br/>
             library(choroplethrMaps)<br/>
             data(country.map)<br/>
             country.map<br/>
             </code> <br/>
    `}
    }
}
class worldMap extends baseModal {
    constructor() {
        var config = {
            id: "worldMap",
            label: localization.en.title,
            modalType: "two",
            RCode: `
## [World Map]
require(choroplethr);
require(choroplethrMaps)
BSkyDfForMap =data.frame(region={{dataset.name}}[,c("{{selected.region | safe}}")], value ={{dataset.name}}[,c("{{selected.value | safe}}")])
print(country_choropleth(BSkyDfForMap, title="{{selected.title | safe}}", legend="{{selected.legend | safe}}", num_colors ={{selected.colors | safe}}{{if (options.selected.zoomByStates !="c('')")}},zoom={{selected.zoomByStates | safe}}{{/if}}))
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            region: {
                el: new dstVariable(config, {
                    label: localization.en.region,
                    required: true,
                    no: "region",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            value: {
                el: new dstVariable(config, {
                    label: localization.en.value,
                    required: true,
                    no: "value",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            colors: {
                el: new advancedSlider(config, {
                    no: "colors",
                    style:"ml-1",
                    label: localization.en.colors,
                    min: 1,
                    max: 9,
                    step: 1,
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            zoomByStates: {
                el: new input(config, {
                    no: 'zoomByStates',
                    allow_spaces:true,
                    label: localization.en.zoomByStates,
                    placeholder: "",
                    type: "character",
                    extraction: "CreateArray",
                    value: ""
                }),
            },
            title: {
                el: new input(config, {
                    no: 'title',
                    allow_spaces:true,
                    label: localization.en.specify_a_title,
                    placeholder: "",
                    type: "character",
                    extraction: "TextAsIs",
                    value: ""
                }),
            },
            legend: {
                el: new input(config, {
                    no: 'legend',
                    allow_spaces:true,
                    label: localization.en.legend,
                    placeholder: "",
                    type: "character",
                    extraction: "TextAsIs",
                    value: ""
                }),
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.region.el.content, objects.value.el.content, objects.colors.el.content, objects.zoomByStates.el.content, objects.title.el.content, objects.legend.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-world",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new worldMap().render()