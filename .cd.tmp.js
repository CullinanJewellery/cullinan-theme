const fs=require("fs");
const p="snippets/card-product.liquid";
let s=fs.readFileSync(p,"utf8");const b=s;

const anchor=`              {%- if show_vendor -%}
                <span class="visually-hidden">{{ 'accessibility.vendor' | t }}</span>
                <div class="caption-with-letter-spacing light">{{ card_product.vendor }}</div>
              {%- endif -%}
`;
if(!s.includes(anchor)) throw new Error("vendor anchor not found");

const addition=anchor+`
              {%- comment -%}
                The italic line under the vendor. The reference carries a stone's
                meaning there; ours carries whatever the product's custom.detail
                metafield holds. Hidden entirely when the metafield is empty.
              {%- endcomment -%}
              {%- assign card_detail = card_product.metafields.custom.detail.value -%}
              {%- if card_detail != blank -%}
                <div class="card__detail">{{ card_detail }}</div>
              {%- endif -%}

              {%- comment -%}
                Swatches for the first option that has them, using Dawn's own
                swatch snippet. Dawn ships it but never uses it on cards.
              {%- endcomment -%}
              {%- for option in card_product.options_with_values -%}
                {%- if option.values.first.swatch != blank -%}
                  <ul class="card__swatches" role="list">
                    {%- for value in option.values limit: 5 -%}
                      {%- if value.swatch != blank -%}
                        <li class="card__swatch">
                          {% render 'swatch', swatch: value.swatch %}
                          <span class="visually-hidden">{{ value.name }}</span>
                        </li>
                      {%- endif -%}
                    {%- endfor -%}
                  </ul>
                  {%- break -%}
                {%- endif -%}
              {%- endfor -%}
`;
s=s.replace(anchor,addition);
fs.writeFileSync(p,s);
const o=(s.match(/\{%-?\s*(if|for|unless|case)\b/g)||[]).length;
const c=(s.match(/\{%-?\s*end(if|for|unless|case)\b/g)||[]).length;
console.log("card patched; liquid blocks",o,"/",c,o===c?"OK":"MISMATCH");
