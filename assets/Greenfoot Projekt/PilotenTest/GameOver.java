import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class GameOver here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class GameOver extends Actor
{
    /**
     * Act - do whatever the GameOver wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */
    public void act() 
    {
        if(MoveBlock.gameOver){
            getImage().setTransparency(1);
            setImage(new GreenfootImage("Game Over!", 32, Color.WHITE, Color.BLACK));
        }else{
            getImage().setTransparency(0);
        }
    }    
}
