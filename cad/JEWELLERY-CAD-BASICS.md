# Jewellery CAD basics

Read this before modelling any piece, and check the finished model against it. The numbers are minimums from the
sources listed at the end, summarised in my own words. Each piece and each caster differs: if the atelier's casting or
setting shows something else, the atelier's result wins and goes in this file.

Our production: Elegoo Saturn 4 Ultra 16K (14 x 19 µm), BlueCast X-Wax, cast in 14K. Models are true size until we have
measured shrinkage from a printed and cast piece.

## Parts of a round stone

Table (flat top), crown (above the girdle), girdle (widest edge), pavilion (cone below), culet (the tip).
Typical proportions used here: crown 16% of the diameter, pavilion 43%, table 55%.

## Every model

| Rule | Value |
|---|---|
| Culet to the inside of the ring | at least 0.5 mm (stone must never touch the finger) |
| Shank thickness | Stuller shows 1.2 and 1.7 mm as its minimums; finishing can remove up to 0.2 mm |
| Thin design elements | at least 0.5 mm of metal |
| Parts that join | overlap each other by at least 0.15 mm |
| Openings | at least 0.4 mm, or they fill in during casting |
| Holes and openings | depth at most twice the diameter |
| Recessed details (grooves, letters) | at least 0.3 mm wide, depth at most twice the width, rounded corners |
| Raised details | at least 0.3 mm thick, at most 0.6 mm high |
| Hollowed-out pieces | structural walls at least 0.8 mm |

## Prongs are posts, never balls

A prong is a post that grows out of solid metal and reaches over the stone. A ball sitting on the surface holds nothing.

1. **Shape**: straight or slightly tapered post, a little wider at the foot on small prongs so the base does not break.
2. **Root**: goes into the metal below (we use 0.3 mm), never just touching the surface.
3. **Height**: the top is a low dome, and **the dome starts at the height of the stone's table**.
4. **Over the stone**: the prong must overlap the girdle, and the seat must not cut more than **25% of the prong**.
5. **Diameter**: pinpoint prongs at least 0.45 mm, claws at least 0.5 mm. Above that minimum, allow for finishing.
6. **Height over the girdle**: tutorials use about 0.3 mm or more; small features at least 0.4 mm tall.
7. **Stone support**: the pavilion barely rests on the seat. Each stone needs at least 3 prongs, with no gap between
   neighbouring prongs of 180° or more (my own geometry check, not from a source).
8. **Cut after adding**: add the prongs first, then cut the stone's shape, so the seat notches the prongs as it would on a
   real piece. The cutter is the stone itself (pavilion, girdle, crown), not a straight cylinder, or the part over the
   girdle is lost.
9. **Spacing**: at least 0.15 mm girdle to girdle.

Bead setting on a bezel or channel is the exception: beads 0.4–0.5 mm, 70% of the bead above the surface, not touching
each other, and only just touching the stone from above.

Other settings:
- Bezel wall at least 0.45 mm.
- Channel wall 0.5 mm (stones under 1.8), 0.65 mm (1.8–2.5), 0.8 mm (over 2.5), with the channel at 95% for rounds.
- Flush setting: wall 0.35–0.5 mm, depending on stone size; the cutter removes all metal above the girdle.

## Holes under stones

From the owner's own file (`newRing4.stl`): a straight hole about half the stone's diameter, starting where the stone's
cone ends. Not a wide funnel. Check it against "depth at most twice the diameter".

## How we build, so the mesh is clean

- CadQuery for shapes, Manifold for booleans. Do not rely on automatic mesh repair (MeshFix filled a gap with a wedge).
- Bands that must look smooth are generated directly as a fine grid.
- After every build: watertight, one body, and the mirror check for symmetric pieces. Volume checks alone miss faults.
- Render and **look**, from above and from a low angle. A straight-down view hides whether a prong is a post.
- Never put stones in the STL that is printed; stones are preview only.

## Sources

- Stuller, *Production Standards: Best Practices for CAD/CAM Services*:
  https://cdn.hackaday.io/files/1657037089437152/CADCAMProductionStandards.pdf (nearly all the values above)
- RhinoArtisan, Dynamic Prongs: https://docs.rhinoartisan.com/commands/diamonds/gemsets/dynamic-prongs
- RhinoArtisan, Custom Prongs: https://www.rhinoartisan.com/docs/7/diamonds/gemsets/custom-prongs/
- RhinoArtisan tutorials with prong values:
  https://rhinoartisan.com/courses/pave-perfection-v7/prongs-cutters-and-finish/,
  https://docs.rhinoartisan.com/tutorials/iconic-fashion-creations/fantasy-ring/prongs
- Cooksongold, 3D Precious Metal Printing Design Guidelines (claws 0.5, structural 0.8):
  https://www.cooksongold.com/downloads/files/Cooksongold%203D%20Precious%20Metal%20Printing%20Design%20Guidelines.pdf
- Materialise gold design guide (features at least 0.35 wide, 0.4 tall), seen through search only: the page no longer opens.
- Ganoksin on seats and setters opening cast holes:
  https://www.ganoksin.com/article/revising-milled-cadcam-models-for-manufacturing
