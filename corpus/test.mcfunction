##pain
#
#asd

say hello world

kill @s

function demo:mass/main

function #demo:some_func_tag with entity @s SelectedItem.id

kill

effect give @s absorption 1 1

execute as @s at @s summon minecraft:villager run setblock ~1 ~1 ~1 #minecraft:grass_block replace

execute if score @s pain.bell match 1..5 run return run say hu

tellraw @a {}

scoreboard players add #a main 1
