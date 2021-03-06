//priority: 997
events.listen('recipes', function(e) {
    e.replaceInput('appliedenergistics2:certus_quartz_dust', '#forge:dusts/certus_quartz')

    function unifyMetal(name, ingotItem, dustItem, blockItem, nuggetItem, dslurryFluid, cslurryFluid, crystalItem, shardItem, clumpItem, dirtydustItem) {
        e.replaceOutput('#forge:ingots/' + name, ingotItem);
        e.replaceOutput('#forge:dusts/' + name, dustItem);
        e.replaceOutput('#forge:nuggets/' + name, nuggetItem);
        e.replaceOutput('#forge:storage_blocks/' + name, blockItem);
        e.remove({
            input: ['#forge:ores/' + name, '#forge:dusts/' + name],
            output: '#forge:ingots/' + name,
            type: 'minecraft:smelting'
        });
        e.remove({
            input: ['#forge:ores/' + name, '#forge:dusts/' + name],
            output: '#forge:ingots/' + name,
            type: 'minecraft:blasting'
        });
        if (name !== 'iron' && name !== 'gold' && name !== 'azure_silver' && name !== 'crimson_iron') {
            console.log("Removing enriching recipes for #forge:ores/" + name + " to mekanism:dust_" + name);
            e.remove({
                input: '#forge:ores/' + name,
                output: 'mekanism:dust_' + name,
                type: 'mekanism:enriching'
            });
            console.log("Removing enriching recipes for mekanism:dirty_dust_" + name + " to mekanism:dust_" + name);
            e.remove({
                input: 'mekanism:dirty_dust_' + name,
                output: 'mekanism:dust_' + name,
                type: 'mekanism:enriching'
            });
            console.log("Removing purifying recipes for #mekanism:clumps/" + name + " to mekanism:dirty_dust_" + name);
            e.remove({
                input: '#mekanism:clumps/' + name,
                output: 'mekanism:dirty_dust_' + name,
                type: 'mekanism:crushing'
            });
            console.log("Removing purifying recipes for #forge:ores/" + name + " to mekanism:clump_" + name);
            e.remove({
                input: '#forge:ores/' + name,
                output: 'mekanism:clump_' + name,
                type: 'mekanism:purifying'
            });
            console.log("Removing purifying recipes for mekanism:shard_" + name + " to mekanism:clump_" + name);
            e.remove({
                input: 'mekanism:shard_' + name,
                output: 'mekanism:clump_' + name,
                type: 'mekanism:purifying'
            });
            console.log("Removing injecting recipes for #forge:ores/" + name + " to mekanism:shard_" + name);
            e.remove({
                input: '#forge:ores/' + name,
                output: 'mekanism:shard_' + name,
                type: 'mekanism:injecting'
            });
/* Not working prior to KubeJS kubejs-1604.3.4.137-forge.jar, unnecessary currently.
            console.log("Removing injecting recipes for mekanism:crystals/" + name + " to mekanism:shard_" + name);
            e.remove({
                input: '#mekanism:crystals/' + name,
                output: 'mekanism:shard_' + name,
                type: 'mekanism:injecting'
            });
            console.log("Removing crystallizing recipes for mekanism:clean_" + name + " to mekanism:shard_" + name);
            e.remove({
                input: {
                    "slurry": "mekanism:clean_" + name,
                    "amount": 200
                },
                output: 'mekanism:crystal_' + name,
                type: 'mekanism:crystallizing'
            });
            console.log("Removing washing recipes for mekanism:dirty_" + name + " to mekanism:clean_" + name);
            e.remove({
                input: {
                    "slurry": "mekanism:dirty_" + name,
                    "amount": 1
                },
                output: {
                    "slurry": "mekanism:clean_" + name,
                    "amount": 1
                },
                type: 'mekanism:washing'
            });
            console.log("Removing dissolution recipes for #forge:ores/" + name + " to mekanism:dirty_" + name);
            e.remove({
                input: '#forge:ores/' + name,
                output: {
                    "slurry": "mekanism:dirty_" + name,
                    "amount": 1000
                },
                type: 'mekanism:dissolution'
            });
*/
            //Uncomment and use this to see if your criteria will match a recipe, and if the recipe is what you want them to match. Useful for updating script, do not leave uncommented for pack release.
            //e.forEachRecipe({}, recipe => console.info('Recipe matched! ' + recipe));
        };

        e.recipes.minecraft.smelting(ingotItem, '#forge:dusts/' + name).xp(.5).id('kubejs:minecraft/smelting/dusts/' + name);
        e.recipes.minecraft.blasting(ingotItem, '#forge:dusts/' + name).xp(.5).id('kubejs:minecraft/blasting/dusts/' + name);

        e.remove({
            id: 'appliedenergistics2:grinder/' + name + '_dust_ingot'
        })
        e.recipes.appliedenergistics2.grinder({
            input: {
                tag: 'forge:ingots/' + name
            },
            result: {
                primary: {
                    item: dustItem,
                    count: 1
                }
            },
            turns: 8
        }).id('kubejs:appliedenergistics2/grinder/ingot/' + name);


        //        if (!ingredient.of('#forge:ores/' + name).empty) {   //If unifiable item doesn't have an ore, add it below (does not work so it's commented out for now)
        e.recipes.minecraft.smelting(ingotItem, '#forge:ores/' + name).xp(1).id('kubejs:minecraft/smelting/ores/' + name);
        e.recipes.minecraft.blasting(ingotItem, '#forge:ores/' + name).xp(1).id('kubejs:minecraft/blasting/ores/' + name);
        e.recipes.mekanism.enriching(item.of(dustItem, 2), '#forge:ores/' + name).id('kubejs:mekanism/enriching/ores/' + name);
        //This is here to stop crushing hammer recipes for modium from generating

        e.remove({
            id: 'appliedenergistics2:grinder/' + name + '_dust_ore'
        })
        e.recipes.appliedenergistics2.grinder({
            input: {
                tag: 'forge:ores/' + name
            },
            result: {
                primary: {
                    item: dustItem,
                    count: 2
                }
            },
            turns: 8
        }).id('kubejs:appliedenergistics2/grinder/ores/' + name);
        //}; //End of if (!ingredient.of('#forge:ores/' + name).empty)
        //e.replaceInput(nuggetItem, ('#forge:nuggets/' + name));
        //e.replaceInput(dustItem, ('#forge:dusts/' + name));
        //e.replaceInput(ingotItem, ('#forge:ingots/' + name));
        //e.replaceInput(blockItem, ('#forge:storage_blocks/' + name));
    };

    function unifyCraftMetal(name, ingotItem, dustItem, blockItem, nuggetItem) {
        e.replaceInput(nuggetItem, ('#forge:nuggets/' + name));
        e.replaceInput(dustItem, ('#forge:dusts/' + name));
        e.replaceInput(ingotItem, ('#forge:ingots/' + name));
        e.replaceInput(blockItem, ('#forge:storage_blocks/' + name));
        e.replaceOutput('#forge:ingots/' + name, ingotItem);
        e.replaceOutput('#forge:dusts/' + name, dustItem);
        e.replaceOutput('#forge:nuggets/' + name, nuggetItem);
        e.replaceOutput('#forge:storage_blocks/' + name, blockItem);
    }
    //Vanilla MC
    unifyMetal('gold', 'minecraft:gold_ingot', 'alltheores:gold_dust', 'minecraft:gold_block', 'minecraft:gold_nugget', 'mekanism:dirty_gold', 'mekanism:clean_gold', 'mekanism:crystal_gold', 'mekanism:shard_gold', 'mekanism:clump_gold', 'mekanism:dirty_dust_gold');
    unifyMetal('iron', 'minecraft:iron_ingot', 'alltheores:iron_dust', 'minecraft:iron_block', 'minecraft:iron_nugget', 'mekanism:dirty_iron', 'mekanism:clean_iron', 'mekanism:crystal_iron', 'mekanism:shard_iron', 'mekanism:clump_iron', 'mekanism:dirty_dust_iron');

    //Multiple Mods
    unifyMetal('aluminum', 'alltheores:aluminum_ingot', 'alltheores:aluminum_dust', 'alltheores:aluminum_block', 'alltheores:aluminum_nugget', 'alltheores:dirty_aluminum', 'alltheores:clean_aluminum', 'alltheores:aluminum_crystal', 'alltheores:aluminum_shard', 'alltheores:aluminum_clump', 'dirty_aluminum_dust');
    unifyMetal('copper', 'alltheores:copper_ingot', 'alltheores:copper_dust', 'alltheores:copper_block', 'alltheores:copper_nugget', 'alltheores:dirty_copper', 'alltheores:clean_copper', 'alltheores:copper_crystal', 'alltheores:copper_shard', 'alltheores:copper_clump', 'alltheores:dirty_copper_dust');
    unifyMetal('lead', 'alltheores:lead_ingot', 'alltheores:lead_dust', 'alltheores:lead_block', 'alltheores:lead_nugget', 'alltheores:dirty_lead', 'alltheores:clean_lead', 'alltheores:lead_crystal', 'alltheores:lead_shard', 'alltheores:lead_clump', 'alltheores:dirty_lead_dust');
    unifyMetal('nickel', 'alltheores:nickel_ingot', 'alltheores:nickel_dust', 'alltheores:nickel_block', 'alltheores:nickel_nugget', 'alltheores:dirty_nickel', 'alltheores:clean_nickel', 'alltheores:nickel_crystal', 'alltheores:nickel_shard', 'alltheores:nickel_clump', 'alltheores:dirty_nickel_dust');
    unifyMetal('platinum', 'alltheores:platinum_ingot', 'alltheores:platinum_dust', 'alltheores:platinum_block', 'alltheores:platinum_nugget', 'alltheores:dirty_platinum', 'alltheores:clean_platinum', 'alltheores:platinum_crystal', 'alltheores:platinum_shard', 'alltheores:platinum_clump', 'alltheores:dirty_platinum_dust');
    unifyMetal('silver', 'alltheores:silver_ingot', 'alltheores:silver_dust', 'alltheores:silver_block', 'alltheores:silver_nugget', 'alltheores:dirty_silver', 'alltheores:clean_silver', 'alltheores:silver_crystal', 'alltheores:silver_shard', 'alltheores:silver_clump', 'alltheores:dirty_silver_dust');
    unifyMetal('tin', 'alltheores:tin_ingot', 'alltheores:tin_dust', 'alltheores:tin_block', 'alltheores:tin_nugget', 'alltheores:dirty_tin', 'alltheores:clean_tin', 'alltheores:tin_crystal', 'alltheores:tin_shard', 'alltheores:tin_clump', 'alltheores:dirty_tin_dust');
    unifyMetal('uranium', 'alltheores:uranium_ingot', 'alltheores:uranium_dust', 'alltheores:uranium_block', 'alltheores:uranium_nugget', 'alltheores:dirty_uranium', 'alltheores:clean_uranium', 'alltheores:uranium_crystal', 'alltheores:uranium_shard', 'alltheores:uranium_clump', 'alltheores:dirty_uranium_dust');
    unifyMetal('zinc', 'alltheores:zinc_ingot', 'alltheores:zinc_dust', 'alltheores:zinc_block', 'alltheores:zinc_nugget', 'alltheores:dirty_zinc', 'alltheores:clean_zinc', 'alltheores:zinc_crystal', 'alltheores:zinc_shard', 'alltheores:zinc_clump', 'alltheores:dirty_zinc_dust');

    //Mekanism
    unifyMetal('osmium', 'alltheores:osmium_ingot', 'alltheores:osmium_dust', 'alltheores:osmium_block', 'alltheores:osmium_nugget', 'alltheores:dirty_osmium', 'alltheores:clean_osmium', 'alltheores:osmium_crystal', 'alltheores:osmium_shard', 'alltheores:osmium_clump', 'alltheores:dirty_osmium_dust');

    //Silent Gear
    unifyMetal('azure_silver', 'silentgear:azure_silver_ingot', 'silentgear:azure_silver_dust', 'silentgear:azure_silver_block', 'silentgear:azure_silver_nugget');
    unifyMetal('crimson_iron', 'silentgear:crimson_iron_ingot', 'silentgear:crimson_iron_dust', 'silentgear:crimson_iron_block', 'silentgear:crimson_iron_nugget');

    //Craft only metals
    //Multiple Mods crafted only (no ore)
    unifyCraftMetal('bronze', 'mekanism:ingot_bronze', 'mekanism:dust_bronze', 'mekanism:block_bronze', 'mekanism:nugget_bronze');
    unifyCraftMetal('steel', 'mekanism:ingot_steel', 'mekanism:dust_steel', 'mekanism:block_steel', 'mekanism:nugget_steel');

    //Thermal
    unifyCraftMetal('constantan', 'thermal:constantan_ingot', 'thermal:constantan_dust', 'thermal:constantan_block', 'thermal:constantan_nugget');
    unifyCraftMetal('electrum', 'thermal:electrum_ingot', 'thermal:electrum_dust', 'thermal:electrum_block', 'thermal:electrum_nugget');
})