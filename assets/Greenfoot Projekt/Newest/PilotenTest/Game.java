import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class MyWorld here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Game extends World
{

    /**
     * Constructor for objects of class MyWorld.
     * 
     */
    public Game()
    {    
        // Create a new world with 600x400 cells with a cell size of 1x1 pixels.
        super(600,400,1);
        prepare();
    }

    /**
     * Prepare the world for the start of the program.
     * That is: create the initial objects and add them to the world.
     */
    private void addSpritesToWorld()
    {
       
    }

    /**
     * Prepare the world for the start of the program.
     * That is: create the initial objects and add them to the world.
     */
    private void prepare()
    {
        Time time = new Time();
        addObject(time, 0, 0);
        
        TimeView timeView = new TimeView(time);
        addObject(timeView, 566, 18);
        
        CollidingBox one = new CollidingBox(70, 60, time);
        addObject(one, 530, 59);
        
        CollidingBox two = new CollidingBox(70, 70, time);
        addObject(two, 66, 64);
        
        CollidingBox three = new CollidingBox(40, 70, time);
        addObject(three, 71, 333);
        
        CollidingBox four = new CollidingBox(110, 31, time);
        addObject(four, 535, 328);
        
        MoveBlock moveBlock = new MoveBlock();
        addObject(moveBlock, 302, 200);
        
        GameOver gameOver = new GameOver();
        addObject(gameOver,302,130);
    }
}
