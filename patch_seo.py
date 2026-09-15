import re

def insert_json_ld(file_path, json_ld_type):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # We will inject the script right after <RedirectIfAdmin /> or <Hero areaName={areaName} /> or just inside the main fragment
    # Let's find the first element in return (...)
    
    json_ld = f"""
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{
          __html: JSON.stringify({{
            "@context": "https://schema.org",
            "@type": "{json_ld_type}",
            "name": `Dapur Srasa ${{areaName}}`,
            "image": "https://dapursrasa.com/meta-image.png",
            "url": `https://dapursrasa.com/${{area}}`,
            "telephone": "+6289532859624",
            "priceRange": "Rp30.000 - Rp199.000",
            "address": {{
              "@type": "PostalAddress",
              "addressLocality": areaName,
              "addressRegion": "Banten",
              "addressCountry": "ID"
            }},
            "areaServed": {{
              "@type": "City",
              "name": areaName
            }}
          }})
        }}}}
      />
    """
    
    if '<RedirectIfAdmin />' in content:
        content = content.replace('<RedirectIfAdmin />', f'<RedirectIfAdmin />\n{json_ld}')
    elif 'return (' in content:
        # replace first <>
        content = content.replace('return (\n    <>', f'return (\n    <>\n{json_ld}')
        
    with open(file_path, 'w') as f:
        f.write(content)

insert_json_ld('src/app/[area]/page.tsx', 'FoodEstablishment')
insert_json_ld('src/app/nasi-box/[area]/page.tsx', 'FoodEstablishment')
insert_json_ld('src/app/catering-mingguan/[area]/page.tsx', 'FoodEstablishment')
print("Patched!")
